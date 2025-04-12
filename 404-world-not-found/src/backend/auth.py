from flask import Flask, request, redirect, url_for, flash, session
from flask_bcrypt import Bcrypt
from flask_mongoengine import MongoEngine  # <-- this is for MongoEngine
from dotenv import load_dotenv
import os

from schemas.user import User

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("FLASK_SECRET_KEY")
app.config["MONGODB_SETTINGS"] = {
    "host": os.getenv("MONGO_URI")  # This is compatible with MongoEngine
}

db = MongoEngine(app)
bcrypt = Bcrypt(app)
