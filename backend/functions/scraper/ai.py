import vertexai
from vertexai.generative_models import GenerativeModel, HarmCategory, HarmBlockThreshold
import os
import datetime

# Setup Gemini Model with explicit token limits for cost control
PROJECT_ID = os.environ.get("GCP_PROJECT", "housing-with-agents")
REGION = "europe-west2"
MODEL_NAME = "gemini-2.5-flash"
PROMPT_VERSION = "v1.0"

vertexai.init(project=PROJECT_ID, location=REGION)

model = GenerativeModel(MODEL_NAME)

SYSTEM_INSTRUCTION = """
You are an expert fact-checker specializing in UK Housing policy and statistics.
Analyze the provided statement and determine its veracity based ONLY on official UK data (ONS, Gov.uk, DLUHC).
You MUST return a JSON object exactly matching this schema:
{
  "verdict": "True" | "Mostly True" | "Misleading" | "False" | "Unverifiable",
  "justification": "Detailed explanation of why this verdict was reached.",
  "references": [
    { "sourceId": "string", "dataPointUrl": "URL", "description": "string" }
  ]
}
"""

def analyze_claim(statement: str, context: str) -> dict:
    """Sends a claim to Vertex AI and returns the structured JSON analysis."""
    
    prompt = f"Context: {context}\nStatement: \"{statement}\"\nAnalyze this statement."
    
    # NFR: max_output_tokens=500 to cap inference costs
    generation_config = {
        "max_output_tokens": 500,
        "temperature": 0.2,
        "response_mime_type": "application/json",
    }
    
    safety_settings = {
        HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    }
    
    try:
        response = model.generate_content(
            [SYSTEM_INSTRUCTION, prompt],
            generation_config=generation_config,
            safety_settings=safety_settings
        )
        
        # Parse the JSON response
        import json
        analysis_data = json.loads(response.text)
        
        # Inject our tracking metadata
        analysis_data["metadata"] = {
            "modelUsed": MODEL_NAME,
            "promptVersion": PROMPT_VERSION,
            "timestamp": datetime.datetime.utcnow().isoformat() + "Z",
            "tokensUsed": response.usage_metadata.total_token_count if hasattr(response, 'usage_metadata') else 0
        }
        
        return analysis_data
        
    except Exception as e:
        print(f"Vertex AI API Error: {str(e)}")
        # Raise so the orchestrator can handle ResourceExhausted (429) errors
        raise e
