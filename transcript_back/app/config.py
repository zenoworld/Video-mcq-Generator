import os

UPLOAD_DIR = os.path.join(os.path.dirname(__file__), '..', 'uploads')
GENERATED_DIR = os.path.join(os.path.dirname(__file__), '..', 'generated')

# Ensure directories exist
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(GENERATED_DIR, exist_ok=True)
