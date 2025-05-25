from app.models import TranscriptChunk, MCQ
from typing import List
import json

def call_local_llm(prompt: str) -> str:
    return """
    [
        {
            "question": "What is the main idea of this segment?",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "answer": "Option B"
        }
    ]
    """

def generate_mcqs_from_chunks(chunks: List[TranscriptChunk]) -> List[MCQ]:
    questions = []

    for chunk in chunks:
        prompt = f"""
You are an assistant that creates multiple-choice questions based on lecture content.

Transcript:
\"\"\"
{chunk.text}
\"\"\"

Generate 1 MCQ in this JSON format:
[
  {{
    "question": "Your question?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "answer": "Option A"
  }}
]
"""

        llm_response = call_local_llm(prompt)
        try:
            mcq_list = json.loads(llm_response)
            for mcq in mcq_list:
                questions.append(MCQ(
                    question=mcq["question"],
                    options=mcq["options"],
                    answer=mcq["answer"]
                ))
        except Exception as e:
            print(f"Error parsing LLM output for chunk {chunk.start_time}-{chunk.end_time}: {e}")
            questions.append(MCQ(
                question=f"What is the summary of the segment from {chunk.start_time} to {chunk.end_time}?",
                options=["Option A", "Option B", "Option C", "Option D"],
                answer="Option A"
            ))

    return questions
