from pydantic import BaseModel

class CandidateCreate(BaseModel):
    candidate_name: str
    position: str

class CandidateResponse(BaseModel):
    candidate_id: int
    candidate_name: str
    position: str
    status: str

    class Config:
        from_attributes = True

class AnalyzeRequest(BaseModel):
    candidate_id: int
    feedback: str

class AnalyzeResponse(BaseModel):
    category: str
    feedback: str

class DashboardResponse(BaseModel):
    total_candidate: int
    total_feedback: int
    top_category: str
    candidates: list[CandidateResponse]