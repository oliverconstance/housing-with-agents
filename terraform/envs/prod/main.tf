# ==============================================================================
# 1. Enable Required GCP APIs (Project Services)
# ==============================================================================
# Before you can create resources in Google Cloud (like a Cloud Function or a database),
# you must explicitly enable the corresponding API for your project.

# `locals` are internal variables within this Terraform file. They are great for
# defining lists or complex expressions once, and reusing them multiple times.
locals {
  services = [
    "cloudresourcemanager.googleapis.com", # Allows Terraform to manage IAM and project settings
    "iam.googleapis.com",                  # Allows creation of Service Accounts and IAM bindings
    "compute.googleapis.com",              # Foundational networking and compute API
    "dns.googleapis.com",                  # Required for Cloud DNS
    "firestore.googleapis.com",            # Required for the database
    "cloudfunctions.googleapis.com",       # Required for 2nd Gen Cloud Functions
    "cloudbuild.googleapis.com",           # Required to build the Cloud Function containers
    "run.googleapis.com",                  # 2nd Gen Cloud Functions run on top of Cloud Run
    "cloudscheduler.googleapis.com",       # Required for the daily cron jobs
    "aiplatform.googleapis.com",           # Vertex AI / Gemini for ML fact-checking
    "secretmanager.googleapis.com"         # Storing sensitive API keys securely
  ]
}

# The `google_project_service` resource turns on APIs.
# By using `for_each`, Terraform acts like a loop, creating one resource for every item in our `local.services` list.
resource "google_project_service" "enabled_apis" {
  for_each                   = toset(local.services)
  project                    = var.project_id
  service                    = each.key
  
  # Best Practice: We don't want Terraform to accidentally disable critical APIs 
  # if we remove them from the list, as this could destroy live resources unexpectedly.
  disable_dependent_services = true
  disable_on_destroy         = false 
}


# ==============================================================================
# 2. Cloud DNS Zone
# ==============================================================================
# Cloud DNS will manage the records (A, TXT, CNAME) for our custom domain.

resource "google_dns_managed_zone" "primary" {
  # Resource names in GCP often cannot contain dots, so we replace them with dashes.
  name        = replace(var.domain_name, ".", "-")
  # The actual DNS name requires a trailing dot.
  dns_name    = "${var.domain_name}."
  description = "Primary DNS zone for UK Housing Data Platform"

  # Explicit Dependency: Terraform is smart and builds a dependency graph. 
  # However, it doesn't automatically know we need the DNS API enabled before creating a DNS zone.
  # We use `depends_on` to force Terraform to wait for the API enablement to finish first.
  depends_on = [google_project_service.enabled_apis]
}


# ==============================================================================
# 3. Firestore Database
# ==============================================================================
# This is our NoSQL data layer where the daily scrape results will be stored.

resource "google_firestore_database" "database" {
  project     = var.project_id
  name        = "(default)" # GCP highly recommends using "(default)" for the primary database
  location_id = var.region
  type        = "FIRESTORE_NATIVE" # Native mode is optimized for web/mobile sync and rich querying

  # Best Practice: Databases hold critical state. Setting deletion_policy to "ABANDON"
  # means if someone deletes this resource from Terraform, Terraform will stop tracking it,
  # but it WON'T actually delete the data in Google Cloud, preventing catastrophic data loss.
  deletion_policy = "ABANDON"

  depends_on = [google_project_service.enabled_apis]
}
