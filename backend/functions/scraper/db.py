import firebase_admin
from firebase_admin import firestore
import hashlib

# Initialize Firebase exactly once
try:
    firebase_admin.get_app()
except ValueError:
    firebase_admin.initialize_app()

db = firestore.client()

def get_statement_hash(statement: str) -> str:
    """Generate a deterministic SHA-256 hash of a statement string for deduplication."""
    return hashlib.sha256(statement.lower().strip().encode('utf-8')).hexdigest()

def is_claim_cached(statement: str) -> bool:
    """Check if we have already fact-checked this exact claim to save API tokens."""
    statement_hash = get_statement_hash(statement)
    docs = db.collection("factChecks").where("statementHash", "==", statement_hash).limit(1).stream()
    return any(True for _ in docs)

def save_fact_check(record_dict: dict, statement: str):
    """Saves a validated FactCheckRecord to Firestore."""
    statement_hash = get_statement_hash(statement)
    record_dict["statementHash"] = statement_hash # Add hash for future lookups
    
    doc_ref = db.collection("factChecks").document(record_dict["id"])
    doc_ref.set(record_dict)
    print(f"Saved fact check {record_dict['id']} to Firestore.")
