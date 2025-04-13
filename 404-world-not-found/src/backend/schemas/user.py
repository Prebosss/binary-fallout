# schemas/user.py
from mongoengine import Document, StringField, DateTimeField, ListField, ReferenceField
from werkzeug.security import check_password_hash
from .achievement import Achievement
import datetime

class User(Document):
    username = StringField(required=True, unique=True)
    password = StringField(required=True)
    created = DateTimeField(default=datetime.datetime.utcnow)

    achievements = ListField(ReferenceField(Achievement))
    solved_cards = ListField(StringField())

    def passwordVerify(self, password):
        return check_password_hash(self.password, password)
