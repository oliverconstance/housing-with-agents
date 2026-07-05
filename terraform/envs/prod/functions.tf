# Bucket for Cloud Functions Source Code
resource "google_storage_bucket" "function_source_bucket" {
  name                        = "${var.project_id}-gcf-source"
  location                    = "EU"
  uniform_bucket_level_access = true
  force_destroy               = true
}

# Compress the Python backend code
data "archive_file" "scraper_zip" {
  type        = "zip"
  source_dir  = "${path.module}/../../../backend/functions/scraper"
  output_path = "${path.module}/.terraform/tmp/scraper.zip"
}

# Upload the zip to the bucket
resource "google_storage_bucket_object" "scraper_zip_object" {
  name   = "scraper-${data.archive_file.scraper_zip.output_md5}.zip"
  bucket = google_storage_bucket.function_source_bucket.name
  source = data.archive_file.scraper_zip.output_path
}

# The Cloud Function (2nd Gen / Cloud Run)
resource "google_cloudfunctions2_function" "daily_scraper" {
  name        = "housing-daily-scraper"
  location    = "europe-west1"
  description = "Daily scraper and Vertex AI fact-checking pipeline"

  build_config {
    runtime     = "python311"
    entry_point = "run_scraper"
    source {
      storage_source {
        bucket = google_storage_bucket.function_source_bucket.name
        object = google_storage_bucket_object.scraper_zip_object.name
      }
    }
  }

  service_config {
    max_instance_count = 1
    available_memory   = "512M"
    timeout_seconds    = 540 # 9 minute hard timeout NFR
    # Use the dedicated service account created in main.tf/iam.tf
    service_account_email = google_service_account.scraper_sa.email
  }
}

# The Cloud Scheduler Job
resource "google_cloud_scheduler_job" "scraper_trigger" {
  name             = "trigger-housing-scraper"
  description      = "Triggers the housing scraper daily at 2:00 AM UTC"
  schedule         = "0 2 * * *"
  time_zone        = "UTC"
  attempt_deadline = "320s"

  http_target {
    http_method = "POST"
    uri         = google_cloudfunctions2_function.daily_scraper.service_config[0].uri

    oidc_token {
      service_account_email = google_service_account.scraper_sa.email
    }
  }
}
