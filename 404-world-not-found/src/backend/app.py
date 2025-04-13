from flask import Flask, request, jsonify
from flask_jwt_extended import create_access_token, JWTManager
from flask_pymongo import PyMongo
from flask_cors import CORS
from dotenv import load_dotenv, find_dotenv
from schemas.user import User
from mongoengine import connect, Document, StringField, DateTimeField
from werkzeug.security import generate_password_hash
import os

app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # Change this!
jwt = JWTManager(app)

# Initialize Flask app
app = Flask(__name__)
CORS(app)

dotenv_path = find_dotenv()
load_dotenv(dotenv_path)

MONGO_URI = os.getenv("MONGO_URI")
connect(host=MONGO_URI)

def passwordHash(password):
    return generate_password_hash(password)

@app.route('/api/addUser', methods=['POST'])
def add_user():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    if User.objects(username=username).first():
        return jsonify({"error": "User already exists"}), 400

    user = User(username=username, password=passwordHash(password))
    user.save()

    return jsonify({"message": "User added successfully"}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Username and password required"}), 400

    user = User.objects(username=username).first()

    if not user:
        return jsonify({"error": "User not found"}), 404

    if not user.passwordVerify(password):
        return jsonify({"error": "Invalid username/password"}), 401

    access_token = create_access_token(identity=username)
    return jsonify({
        "message": "Login successful",
        "token": access_token
    }), 200
    

    

if __name__ == "__main__":
    app.run(debug=True, port=5001)