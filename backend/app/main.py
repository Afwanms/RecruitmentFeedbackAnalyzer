from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base, get_db
from .models import Candidate, Feedback
from . import crud, schemas, analyze
from sqlalchemy.orm import Session

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)
## Endpoint to send data
@app.post("/candidates", response_model=schemas.CandidateResponse)
def create_candidate(candidate: schemas.CandidateCreate, db: Session = Depends(get_db)):
    return crud.create_candidate(db=db, candidate=candidate)

@app.post("/feedback/analyze", response_model=schemas.AnalyzeResponse)
def analyze_feedback(request: schemas.AnalyzeRequest, db: Session = Depends(get_db)):
    category = analyze.analyze_feedback(request.feedback)
    crud.save_feedback(db=db, 
                       candidate_id=request.candidate_id, 
                       feedback=request.feedback,
                       category=category
                       )
    return {
        "category": category,
        "feedback": request.feedback
    }

## Endpoint to receive data
@app.get("/candidates/{candidate_id}", response_model=schemas.CandidateResponse)
def get_candidate(candidate_id: int, db: Session = Depends(get_db)):
    return crud.get_candidate(db, candidate_id)

@app.get("/dashboard", response_model=schemas.DashboardResponse)
def dashboard(db: Session = Depends(get_db)):
    return crud.get_dashboard(db)