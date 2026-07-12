import functions_framework
import json
import traceback
from db import is_claim_cached, save_fact_check
from ai import analyze_claim
from sources.govuk import scrape_govuk_press_releases
from sources.bbc import scrape_bbc_news
from sources.insidehousing import scrape_inside_housing
from sources.mhclg_stock import fetch_mhclg_stock_data, generate_references, save_to_firestore
from models import FactCheckRecord

@functions_framework.http
def run_scraper(request):
    """
    HTTP Cloud Function entry point.
    Triggered daily via Cloud Scheduler.
    """
    try:
        print("Starting daily housing scraper pipeline...")
        
        # --- Update Stock Data & References ---
        print("Scraping and updating MHCLG stock data and references...")
        stock_data = fetch_mhclg_stock_data()
        refs = generate_references()
        save_to_firestore(stock_data, refs)
        
        # --- Gather & Process Claims ---
        all_claims = []
        all_claims.extend(scrape_govuk_press_releases())
        all_claims.extend(scrape_bbc_news())
        all_claims.extend(scrape_inside_housing())
        
        print(f"Discovered {len(all_claims)} claims to process.")
        
        processed_count = 0
        cached_count = 0
        
        for claim in all_claims:
            statement = claim.statement
            if is_claim_cached(statement):
                print(f"Skipping cached claim: '{statement[:30]}...'")
                cached_count += 1
                continue
                
            print(f"Analyzing new claim: '{statement[:30]}...'")
            analysis_data = analyze_claim(statement, claim.context)
            
            record = FactCheckRecord(claim=claim, analysis=analysis_data)
            save_fact_check(record.model_dump(), statement)
            
            processed_count += 1
            
        summary = {
            "status": "success",
            "stockRecordsUpdated": len(stock_data),
            "claimsDiscovered": len(all_claims),
            "claimsProcessed": processed_count,
            "claimsSkippedCached": cached_count
        }
        
        return (json.dumps(summary), 200, {'Content-Type': 'application/json'})
    
    except Exception as e:
        error_msg = f"Error executing scraper: {str(e)}\n{traceback.format_exc()}"
        print(error_msg)
        return (json.dumps({"status": "error", "message": str(e)}), 500, {'Content-Type': 'application/json'})
