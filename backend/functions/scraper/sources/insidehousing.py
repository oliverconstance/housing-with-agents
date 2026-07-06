import requests
from bs4 import BeautifulSoup
import datetime
from typing import List
from models import Claim, Speaker

def scrape_inside_housing() -> List[Claim]:
    """Scrapes recent articles from Inside Housing."""
    print("Scraping Inside Housing...")
    
    url = "https://www.insidehousing.co.uk/news"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    claims = []
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        count = 0
        # Find headlines in h2 or h3 tags
        for heading in soup.find_all(['h2', 'h3']):
            if count >= 5:
                break
                
            a_tag = heading.find('a')
            if a_tag and '/news/' in a_tag.get('href', ''):
                title = a_tag.text.strip()
                link = a_tag['href']
                if not link.startswith('http'):
                    link = f"https://www.insidehousing.co.uk{link}"
                
                # We use the title as the statement since full text is often paywalled
                # For Inside Housing, date might be in a time tag or span. For now, default to today's date if not found.
                date_made_str = ""
                time_tag = heading.find_next_sibling('time')
                if time_tag and time_tag.has_attr('datetime'):
                    date_made_str = time_tag['datetime']
                
                date_made = date_made_str if date_made_str else datetime.datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0).isoformat() + "Z"
                
                claims.append(Claim(
                    statement=title,
                    speaker=Speaker(type="journalist", name="Inside Housing Journalist", affiliation="Inside Housing"),
                    context="News headline",
                    dateMade=date_made,
                    sourceUrl=link
                ))
                count += 1
                
    except Exception as e:
        print(f"Error scraping Inside Housing: {e}")
        
    return claims
