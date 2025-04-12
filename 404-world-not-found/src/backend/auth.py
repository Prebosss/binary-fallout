import os
from flask import Flask, render_template, request, redirect, url_for, flash, session
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("FLASK_SECRET_KEY")
app.config["MONGO_URI"] = os.getenv("MONGO_URI")

mongo = PyMongo(app)
bcrypt = Bcrypt(app)

# Helper collection
users_collection = mongo.db.users

@app.route('/')
def home():
    # Check if user is logged in
    if session.get('username'):
        return f"Hello, {session['username']}! <br><a href='/logout'>Logout</a>"
    return "Hello, Guest! <br><a href='/login'>Login</a> | <a href='/register'>Register</a>"

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        # Retrieve form data
        username = request.form.get('username')
        password = request.form.get('password')
        
        # Check if user already exists
        if users_collection.find_one({"username": username}):
            flash("Username already exists. Please choose a different one.", "error")
            return redirect(url_for('register'))
        
        # Hash the password before storing it
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        
        # Insert the new user record into MongoDB
        users_collection.insert_one({
            "username": username,
            "password": hashed_password
        })
        
        flash("Registration successful! Please login.", "success")
        return redirect(url_for('login'))
    
    return render_template("register.html")

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        
        # Retrieve the user from the database
        user = users_collection.find_one({"username": username})
        
        # Verify user exists and password matches
        if user and bcrypt.check_password_hash(user['password'], password):
            # Set a session variable
            session['username'] = username
            flash("Logged in successfully!", "success")
            return redirect(url_for('home'))
        else:
            flash("Invalid username or password.", "error")
            return redirect(url_for('login'))
    
    return render_template("login.html")

@app.route('/logout')
def logout():
    session.pop('username', None)
    flash("You have been logged out.", "info")
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True)
