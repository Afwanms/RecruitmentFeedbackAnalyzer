from fastapi import FastAPI, Depends
from .database import engine, Base, get_db
from .models import Candidate, Feedback
from . import crud, schemas
from sqlalchemy.orm import Session

app = FastAPI()

Base.metadata.create_all(bind=engine)
@app.post("/candidates", response_model=schemas.CandidateResponse)
def create_candidate(candidate: schemas.CandidateCreate, db: Session = Depends(get_db)):
    return crud.create_candidate(db=db, candidate=candidate)

@app.get("/candidates/{candidate_id}", response_model=schemas.CandidateResponse)
def get_candidate(candidate_id: int, db: Session = Depends(get_db)):
    return crud.get_candidate(db, candidate_id)

@app.get("/dashboard", response_model=schemas.DashboardResponse)
def dashboard(db: Session = Depends(get_db)):
    return crud.get_dashboard(db)