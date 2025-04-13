import os
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from google import genai
from flask_cors import CORS

# Load environment variables from .env
load_dotenv()

# Get the API key from the environment variable
api = os.getenv("GEMINI_API_KEY")

# Initialize Flask app
app = Flask(__name__)
CORS(app)

@app.route("/generate", methods=["POST"])
def generate_content():
    data = request.json
    prompt = data.get("prompt", "")

    client = genai.Client(api_key=api)
    response = client.models.generate_content(
        model="gemini-2.0-flash", contents=prompt
    )
    return jsonify({"response": response.text})

if __name__ == "__main__":
    app.run(debug=True)