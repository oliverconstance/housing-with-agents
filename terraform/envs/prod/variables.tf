# ==============================================================================
# Input Variables Configuration
# ==============================================================================
# Variables act like arguments to a function. They allow us to customize our 
# Terraform modules without altering the underlying source code.
# This makes our code reusable across different environments (e.g., dev, staging, prod).

# The `project_id` variable represents the globally unique identifier for our Google Cloud Project.
variable "project_id" {
  type        = string
  description = "The GCP Project ID where all resources will be deployed."
  # Notice there is no 'default' here. This forces the user (or CI/CD pipeline) 
  # to explicitly provide a value, ensuring we don't accidentally deploy to the wrong place.
}

# The `region` variable defines the geographic location where our resources will live.
variable "region" {
  type        = string
  description = "The default GCP region for compute and storage resources."
  default     = "europe-west2" # Defaulting to London for UK Housing data latency.
}

# The `domain_name` variable defines the web address for our frontend.
variable "domain_name" {
  type        = string
  description = "The custom domain name for the platform (e.g., ukhousingdata.org). Used to configure DNS zones."
}
