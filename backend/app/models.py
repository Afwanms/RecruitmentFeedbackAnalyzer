from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class Candidate(Base):
    __tablename__ = "candidate"
    candidate_id = Column(Integer, primary_key=True, index=True)
    candidate_name = Column(String, nullable=False)
    position = Column(String, nullable=False)
    status = Column(String, default="Pending")
    feedbacks = relationship("Feedback", back_populates="candidate")

class Feedback(Base):
    __tablename__ = "feedback"
    feedback_id = Column(Integer, primary_key=True, index=True)
    candidate_id = Column(Integer, ForeignKey("candidate.candidate_id"), nullable=False)
    client_feedback = Column(Text, nullable=False)
    category = Column(String, default="-")
    created_at = Column(DateTime, default=datetime.utcnow)
    candidate = relationship("Candidate", back_populates="feedbacks")