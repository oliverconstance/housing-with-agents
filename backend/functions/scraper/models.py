from typing import Literal, Optional, List
from pydantic import BaseModel, Field, HttpUrl
import uuid
import datetime

# FactCheck Models
class Speaker(BaseModel):
    type: Literal["politician", "journalist", "organization", "social_media_account", "website", "other"]
    name: str
    affiliation: Optional[str] = None

class Claim(BaseModel):
    statement: str
    speaker: Speaker
    context: str
    dateMade: str # ISO-8601
    sourceUrl: str

class Reference(BaseModel):
    sourceId: str
    dataPointUrl: str
    description: str

class AnalysisMetadata(BaseModel):
    modelUsed: str
    promptVersion: str
    timestamp: str # ISO-8601
    tokensUsed: int

class Analysis(BaseModel):
    verdict: Literal["True", "Mostly True", "Misleading", "False", "Unverifiable"]
    justification: str
    metadata: AnalysisMetadata
    references: List[Reference]

class FactCheckRecord(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    claim: Claim
    analysis: Optional[Analysis] = None # Optional because it starts without analysis
