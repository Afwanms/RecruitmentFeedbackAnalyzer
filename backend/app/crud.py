from sqlalchemy.orm import Session
from sqlalchemy import func
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
    top_category = (db.query(models.Feedback.category, func.count(models.Feedback.category).label("count"))
                    .group_by(models.Feedback.category)
                    .order_by(func.count(models.Feedback.category).desc())
                    .first())
    candidates = db.query(models.Candidate).all()
    return {
        "total_candidate": total_candidate,
        "total_feedback": total_feedback,
        "top_category": top_category[0] if top_category else "-",
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