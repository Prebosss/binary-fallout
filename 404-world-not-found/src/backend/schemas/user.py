
# schemas/user.py
from mongoengine import Document, StringField, DateTimeField
from werkzeug.security import check_password_hash
from datetime import datetime

class User(Document):
    username = StringField(required=True, unique=True)
    password = StringField(required=True)
    created_at = DateTimeField(default=datetime.utcnow)
    
    meta = {'collection': 'users'}
    
    def passwordVerify(self, password):
        return check_password_hash(self.password, password)