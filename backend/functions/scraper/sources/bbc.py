from typing import List
from models import Claim, Speaker
import datetime

def scrape_bbc_news() -> List[Claim]:
    """Scrapes recent housing articles from BBC News."""
    print("Scraping BBC News...")
    
    # URL for BBC News Housing
    # url = "https://feeds.bbci.co.uk/news/business/economy/housing/rss.xml"
    
    # Stub implementation returning dummy schemas
    claims = []
    claims.append(Claim(
        statement="House prices have fallen by 2% in the last quarter.",
        speaker=Speaker(type="journalist", name="BBC Economy Correspondent", affiliation="BBC News"),
        context="Article on UK Housing Market",
        dateMade=datetime.datetime.utcnow().isoformat() + "Z",
        sourceUrl="https://www.bbc.co.uk/news/dummy-housing-article"
    ))
    
    return claims
