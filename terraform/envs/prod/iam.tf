# ==============================================================================
# Identity and Access Management (IAM)
# ==============================================================================
# In GCP, "Service Accounts" are identities for applications or virtual machines,
# distinct from human user accounts. This allows our backend code to authenticate
# securely without using hardcoded passwords.

# 1. Create the Scraper Service Account
resource "google_service_account" "scraper_sa" {
  account_id   = "housing-scraper-sa"
  display_name = "Service Account for Daily Housing Scraper"
  description  = "Used by Cloud Functions to scrape data, call Vertex AI, and write to Firestore."
  project      = var.project_id
}

# ==============================================================================
# Principle of Least Privilege: Role Bindings
# ==============================================================================
# We explicitly define EXACTLY what the service account is allowed to do. 
# We NEVER give it broad "Editor" or "Owner" access, which prevents catastrophic 
# damage if the Cloud Function code is ever compromised.

# 2. Grant Datastore User
# This allows the function to write the fact-checked data into Firestore.
# We use string interpolation ("${...}") to dynamically grab the email address
# of the service account we just created above.
resource "google_project_iam_member" "scraper_datastore_user" {
  project = var.project_id
  role    = "roles/datastore.user"
  member  = "serviceAccount:${google_service_account.scraper_sa.email}"
}

# 3. Grant Vertex AI User
# This allows the function to send prompts to the Gemini ML models for fact-checking.
resource "google_project_iam_member" "scraper_vertex_user" {
  project = var.project_id
  role    = "roles/aiplatform.user"
  member  = "serviceAccount:${google_service_account.scraper_sa.email}"
}

# 4. Grant Secret Accessor
# This allows the function to fetch secure 3rd-party API keys (e.g., for news APIs)
# stored in Google Secret Manager, without hardcoding them in the code.
resource "google_project_iam_member" "scraper_secret_accessor" {
  project = var.project_id
  role    = "roles/secretmanager.secretAccessor"
  member  = "serviceAccount:${google_service_account.scraper_sa.email}"
}

# 5. Grant Firebase Admin to CI/CD Service Account
# Since we are deploying the frontend via GitHub Actions using the CI/CD service account,
# we need to grant it Firebase Admin permissions to publish to Hosting.
resource "google_project_iam_member" "cicd_firebase_admin" {
  project = var.project_id
  role    = "roles/firebase.admin"
  # Hardcoding the CI/CD SA since it was created manually in Milestone 0
  member  = "serviceAccount:github-service-account-tf@${var.project_id}.iam.gserviceaccount.com"
}
