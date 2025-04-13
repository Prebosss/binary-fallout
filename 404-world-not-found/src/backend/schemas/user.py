# schemas/user.py
from mongoengine import Document, StringField, DateTimeField, ListField, ReferenceField
from werkzeug.security import check_password_hash
from .achievement import Achievement
from datetime import datetime

class User(Document):
    username = StringField(required=True, unique=True)
    password = StringField(required=True)
    # ---> ADD THIS LINE <---
    created_at = DateTimeField(default=datetime.utcnow) # Adds the missing field

    achievements = ListField(ReferenceField(Achievement))
    solved_cards = ListField(StringField())

    meta = {'collection': 'users'} # Make sure collection name is correct

    def passwordVerify(self, check_password):
        return check_password_hash(self.password, check_password)

