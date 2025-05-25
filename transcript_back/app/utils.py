import os
from fastapi import UploadFile
from app.config import UPLOAD_DIR

def save_upload(file: UploadFile) -> str:
    filepath = os.path.join(UPLOAD_DIR, file.filename)
    with open(filepath, "wb") as f:
        f.write(file.file.read())
    return filepath
