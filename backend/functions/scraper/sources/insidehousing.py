from typing import List
from models import Claim, Speaker
import datetime

def scrape_inside_housing() -> List[Claim]:
    """Scrapes recent articles from Inside Housing."""
    print("Scraping Inside Housing...")
    
    # Stub implementation returning dummy schemas
    claims = []
    claims.append(Claim(
        statement="Social housing waitlists have hit a record high of 1.2 million households.",
        speaker=Speaker(type="organization", name="Shelter", affiliation="Charity"),
        context="Report quoted in Inside Housing article",
        dateMade=datetime.datetime.utcnow().isoformat() + "Z",
        sourceUrl="https://www.insidehousing.co.uk/news/dummy-article"
    ))
    
    return claims
