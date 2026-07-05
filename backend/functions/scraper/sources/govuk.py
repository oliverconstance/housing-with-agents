import requests
from bs4 import BeautifulSoup
from typing import List
from models import Claim, Speaker
import datetime

def scrape_govuk_press_releases() -> List[Claim]:
    """Scrapes recent housing press releases from Gov.uk."""
    print("Scraping Gov.uk...")
    
    # URL for MHCLG (Ministry of Housing, Communities & Local Government)
    search_url = "https://www.gov.uk/api/search.json?filter_organisations=ministry-of-housing-communities-local-government&filter_format=press_release&order=-public_timestamp"
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    claims = []
    
    try:
        response = requests.get(search_url, headers=headers)
        response.raise_for_status()
        data = response.json()
        
        results = data.get('results', [])[:5]  # Get top 5 recent press releases
        
        for result in results:
            title = result.get('title', '')
            description = result.get('description', '')
            link = result.get('link', '')
            date_made = result.get('public_timestamp', datetime.datetime.utcnow().isoformat() + "Z")
            
            if not link:
                continue
                
            article_url = f"https://www.gov.uk{link}"
            
            # Fetch the actual article to extract a more substantial claim
            try:
                article_resp = requests.get(article_url, headers=headers)
                article_resp.raise_for_status()
                soup = BeautifulSoup(article_resp.text, 'html.parser')
                
                # The main content is usually in a div with class 'gem-c-govspeak' or 'govspeak'
                content_div = soup.find('div', class_='govspeak')
                
                statement = description
                if content_div:
                    # Find the first paragraph that has some substance
                    paragraphs = content_div.find_all('p')
                    for p in paragraphs:
                        text = p.get_text(strip=True)
                        if len(text) > 50 and not text.startswith("Notes to editors"):
                            statement = text
                            break
                            
                claims.append(Claim(
                    statement=statement,
                    speaker=Speaker(type="politician", name="MHCLG Representative", affiliation="UK Government"),
                    context=title,
                    dateMade=date_made,
                    sourceUrl=article_url
                ))
            except Exception as e:
                print(f"Error scraping article {article_url}: {e}")
                
    except Exception as e:
        print(f"Error fetching Gov.uk search API: {e}")
        
    return claims
