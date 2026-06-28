from sqlalchemy.orm import Session
from . import models, schemas

## Create Candidate
def create_candidate(db: Session, candidate: schemas.CandidateCreate):
    db_candidate = models.Candidate(
        candidate_name = candidate.candidate_name,
        position = candidate.position
    )
    db.add(db_candidate)
    db.commit()
    db.refresh(db_candidate)
    return db_candidate

## Get Candidate
def get_candidate(db: Session, candidate_id: int):
    return(
        db.query(models.Candidate)
        .filter(models.Candidate.candidate_id == candidate_id)
        .first()
    )

## Get Dashboard
def get_dashboard(db: Session, skip: int = 0, limit: int = 100):
    total_candidate = db.query(models.Candidate.candidate_id).count()
    total_feedback = db.query(models.Feedback.feedback_id).count()
    candidates = db.query(models.Candidate).all()
    return {
        "total_candidate": total_candidate,
        "total_feedback": total_feedback,
        "top_category": "-",
        "candidates": candidates
    }

## Save Feedback
def save_feedback(db: Session, candidate_id: int, feedback: str, category: str):
    db_feedback = models.Feedback(
        candidate_id = candidate_id,
        client_feedback = feedback,
        category = category
    )

    db.add(db_feedback)
    candidate = get_candidate(db, candidate_id)
    if candidate:
        candidate.status = "Analyzed"
    db.commit()
    return db_feedback