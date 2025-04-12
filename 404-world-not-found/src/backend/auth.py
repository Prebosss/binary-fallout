import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Access the keys securely
API_KEY = os.getenv("GEMINI_API_KEY")

