import os
import requests
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Get the API key from the environment variable
api_key = os.getenv("GEMINI_API_KEY")

# Define the test endpoint (replace with the actual Gemini API endpoint)
url = "https://api.gemini.com/v1/symbols"  # Example endpoint to fetch trading pairs

# Set up headers with the API key (if required by the endpoint)
headers = {
    "Authorization": f"Bearer {api_key}"  # Replace "Bearer" with the required format if different
}

# Send the request
response = requests.get(url, headers=headers)

# Print the response
if response.status_code == 200:
    print("API Key is valid!")
    print("Response:", response.json())
else:
    print("API Key is invalid or the request failed.")
    print("Status Code:", response.status_code)
    print("Response:", response.text)