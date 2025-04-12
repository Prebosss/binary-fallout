from mongoengine import Document, StringField, DateTimeField
from werkzeug.security import check_password_hash
import datetime

class User(Document):
    username = StringField(required=True, unique=True)
    password = StringField(required=True)
    created = DateTimeField(default=datetime.datetime.utcnow)
    def passwordVerify(self, password):
        return check_password_hash(self.password, password)


