from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from dotenv import load_dotenv, find_dotenv
import os

# Initialize Flask app
app = Flask(__name__)

# Load environment variables
dotenv_path = find_dotenv()
load_dotenv(dotenv_path)

# Example POST route
@app.route('/test', methods=['POST'])
def test_post():
    data = request.json  # Get JSON data from the request
    return jsonify({"message": "Data received", "data": data}), 200

if __name__ == '__main__':
    app.run(debug=True, port = 5001)
