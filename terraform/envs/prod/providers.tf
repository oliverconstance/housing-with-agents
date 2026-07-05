# ==============================================================================
# Terraform Settings & Backend Configuration
# ==============================================================================
# The `terraform` block configures the core behavior of Terraform itself.
terraform {
  # We specify a required minimum version to ensure compatibility and prevent 
  # syntax errors if someone runs this with an outdated version of Terraform.
  required_version = ">= 1.5.0"

  # The `required_providers` block tells Terraform which plugins it needs to 
  # interact with remote APIs. In our case, we are interacting with Google Cloud.
  required_providers {
    # The standard Google provider handles most stable GCP resources.
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0" # "~>" means we accept any 5.x version, but not 6.0.
    }
    # The Google Beta provider is required for some newer features or services 
    # that haven't graduated to General Availability (GA) yet.
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "~> 5.0"
    }
  }

  # The `backend` block tells Terraform where to store its "state file".
  # The state file maps the real-world cloud resources to your configuration.
  # Using "gcs" (Google Cloud Storage) ensures the state is stored centrally, 
  # safely, and supports state locking so multiple engineers (or CI/CD pipelines)
  # don't overwrite each other's changes concurrently.
  backend "gcs" {
    # We define the prefix (folder path) inside the bucket. 
    # The actual bucket name is passed during `terraform init` via CI/CD to keep it secure.
    prefix = "terraform/state/prod"
  }
}

# ==============================================================================
# Provider Configurations
# ==============================================================================
# Provider blocks configure the plugins defined above. They authenticate 
# and set default configurations (like the target project and region).

provider "google" {
  project = var.project_id
  region  = var.region
}

provider "google-beta" {
  project = var.project_id
  region  = var.region
}
