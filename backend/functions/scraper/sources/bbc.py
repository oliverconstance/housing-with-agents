import requests
import xml.etree.ElementTree as ET
import datetime
from typing import List
from models import Claim, Speaker

def scrape_bbc_news() -> List[Claim]:
    """Scrapes recent housing articles from BBC News."""
    print("Scraping BBC News...")
    
    # URL for BBC News Business
    url = "https://feeds.bbci.co.uk/news/business/rss.xml"
    claims = []
    
    try:
        response = requests.get(url)
        response.raise_for_status()
        
        root = ET.fromstring(response.content)
        
        # Filter for housing related keywords
        keywords = ["housing", "house", "mortgage", "rent", "property", "tenant", "landlord"]
        
        count = 0
        for item in root.findall('.//item'):
            if count >= 5: # Limit to top 5
                break
                
            title = item.find('title').text if item.find('title') is not None else ""
            description = item.find('description').text if item.find('description') is not None else ""
            link = item.find('link').text if item.find('link') is not None else ""
            
            pub_date_str = item.find('pubDate').text if item.find('pubDate') is not None else ""
            pub_date = datetime.datetime.utcnow().isoformat() + "Z"
            if pub_date_str:
                try:
                    from email.utils import parsedate_to_datetime
                    dt = parsedate_to_datetime(pub_date_str)
                    pub_date = dt.isoformat()
                except Exception:
                    pass
            
            # Check if any keyword is in title or description
            text_to_check = (title + " " + description).lower()
            if any(kw in text_to_check for kw in keywords):
                claims.append(Claim(
                    statement=description,
                    speaker=Speaker(type="journalist", name="BBC Journalist", affiliation="BBC News"),
                    context=title,
                    dateMade=pub_date,
                    sourceUrl=link
                ))
                count += 1
                
    except Exception as e:
        print(f"Error scraping BBC News: {e}")
        
    return claims
