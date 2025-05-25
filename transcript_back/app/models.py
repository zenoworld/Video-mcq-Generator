from pydantic import BaseModel
from typing import List

class TranscriptChunk(BaseModel):
    start_time: str
    end_time: str
    text: str

class MCQ(BaseModel):
    question: str
    options: List[str]
    answer: str

class TranscriptionResponse(BaseModel):
    transcript: List[TranscriptChunk]
    mcqs: List[MCQ]
