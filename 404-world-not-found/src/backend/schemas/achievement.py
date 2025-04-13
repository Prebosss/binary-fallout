# schemas/achievement.py
from mongoengine import Document, StringField, DateTimeField
import datetime

class Achievement(Document):
    name = StringField(required=True, unique=True)
    description = StringField(required=True)
    created = DateTimeField(default=datetime.datetime.utcnow)
