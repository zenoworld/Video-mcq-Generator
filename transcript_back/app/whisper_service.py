from faster_whisper import WhisperModel
from app.models import TranscriptChunk
from typing import List

model = WhisperModel("base", compute_type="int8")

def transcribe_video(file_path: str) -> List[TranscriptChunk]:
    segments, _ = model.transcribe(file_path)
    chunks = []
    text_accumulator = ""
    chunk_start = 0.0

    for segment in segments:
        start, end, text = segment.start, segment.end, segment.text
        if end - chunk_start <= 300:  # 5 minutes = 300 seconds
            text_accumulator += " " + text
        else:
            chunks.append(TranscriptChunk(
                start_time=str(round(chunk_start, 2)),
                end_time=str(round(end, 2)),
                text=text_accumulator.strip()
            ))
            chunk_start = end
            text_accumulator = text

    if text_accumulator.strip():
        chunks.append(TranscriptChunk(
            start_time=str(round(chunk_start, 2)),
            end_time=str(round(end, 2)),
            text=text_accumulator.strip()
        ))

    return chunks
