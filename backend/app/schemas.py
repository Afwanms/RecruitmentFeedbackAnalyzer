from pydantic import BaseModel
from datetime import datetime

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

class FeedbackResponse(BaseModel):
    feedback_id: int
    client_feedback: str
    category: str
    created_at: datetime

    class Config:
        from_attributes = True


class CandidateDetailResponse(BaseModel):
    candidate_id: int
    candidate_name: str
    position: str
    status: str
    feedback: FeedbackResponse | None = None

    class Config:
        from_attributes = True