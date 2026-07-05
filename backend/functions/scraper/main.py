import functions_framework
import json
import traceback
from db import is_claim_cached, save_fact_check
from ai import analyze_claim
from sources.govuk import scrape_govuk_press_releases
from sources.bbc import scrape_bbc_news
from sources.insidehousing import scrape_inside_housing
from models import FactCheckRecord

@functions_framework.http
def run_scraper(request):
    """
    HTTP Cloud Function entry point.
    Triggered daily via Cloud Scheduler.
    """
    try:
        print("Starting daily housing scraper pipeline...")
        
        # 1. Gather all claims
        all_claims = []
        all_claims.extend(scrape_govuk_press_releases())
        all_claims.extend(scrape_bbc_news())
        all_claims.extend(scrape_inside_housing())
        
        print(f"Discovered {len(all_claims)} claims to process.")
        
        processed_count = 0
        cached_count = 0
        
        # 2. Process each claim
        for claim in all_claims:
            statement = claim.statement
            
            # NFR: Check cache to prevent duplicate LLM cost
            if is_claim_cached(statement):
                print(f"Skipping cached claim: '{statement[:30]}...'")
                cached_count += 1
                continue
                
            print(f"Analyzing new claim: '{statement[:30]}...'")
            
            # 3. Analyze with Vertex AI
            analysis_data = analyze_claim(statement, claim.context)
            
            # 4. Save to Firestore (Validating against Pydantic model)
            record = FactCheckRecord(claim=claim, analysis=analysis_data)
            save_fact_check(record.model_dump(), statement)
            
            processed_count += 1
            
        summary = {
            "status": "success",
            "claimsDiscovered": len(all_claims),
            "claimsProcessed": processed_count,
            "claimsSkippedCached": cached_count
        }
        
        return (json.dumps(summary), 200, {'Content-Type': 'application/json'})
    
    except Exception as e:
        error_msg = f"Error executing scraper: {str(e)}\n{traceback.format_exc()}"
        print(error_msg)
        return (json.dumps({"status": "error", "message": str(e)}), 500, {'Content-Type': 'application/json'})
