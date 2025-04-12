from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from dotenv import load_dotenv, find_dotenv
from schemas.user import User
from mongoengine import connect, Document, StringField, DateTimeField
import os

# Initialize Flask app
app = Flask(__name__)

dotenv_path = find_dotenv()
load_dotenv(dotenv_path)

MONGO_URI = os.getenv("MONGO_URI")
connect(host=MONGO_URI)



@app.route('/api/addUser', methods=['POST'])
def add_user():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    if User.objects(username=username).first():
        return jsonify({"error": "User already exists"}), 400

    user = User(username=username, password=password)
    user.save()

    return jsonify({"message": "User added successfully"}), 201


if __name__ == "__main__":
    app.run(debug=True, port=5001)