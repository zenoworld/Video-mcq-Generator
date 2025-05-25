from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from app.utils import save_upload
from app.whisper_service import transcribe_video
from app.llm_service import generate_mcqs_from_chunks
from app.models import TranscriptionResponse

app = FastAPI()
origins =[
    "http://localhost:5173",
    "http://localhost:5000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/process", response_model=TranscriptionResponse)
async def process_video(file: UploadFile = File(...)):
    path = save_upload(file)
    chunks = transcribe_video(path)
    mcqs = generate_mcqs_from_chunks(chunks)
    return TranscriptionResponse(transcript=chunks, mcqs=mcqs)
