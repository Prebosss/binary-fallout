from mongoengine import Document, StringField, DateTimeField
import datetime

class User(Document):
    username = StringField(required=True, unique=True)
    password = StringField(required=True)
    created = DateTimeField(default=datetime.datetime.utcnow)

    def passwordVerify(self, password):
        return self.password == password
        
