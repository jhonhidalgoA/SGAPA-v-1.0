from datetime import datetime, timedelta
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Modelo rol
class Role(db.Model):
    __tablename__ = 'roles'
    id = db.Column(db.Integer, primary_key =True)
    name =db.Column(db.String(50), nullable=False, unique=True)
    users = db.relationship('User', backref='role', lazy=True)



# Modelo de Usuario
class User(db.Model):
    __tablename__ = 'login'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.String(100), nullable=False)
    id_rol = db.Column(db.Integer, db.ForeignKey('roles.id'), nullable=False)
    failed_attempts = db.Column(db.Integer, default=0)
    last_failed_attempt = db.Column(db.DateTime, default=datetime.utcnow)

    # Método para verificar si el usuario está bloqueado
    def is_locked_out(self):
        if self.failed_attempts >= 5:  
            lockout_period = timedelta(minutes=1)
            if datetime.utcnow() - self.last_failed_attempt < lockout_period:  
                return True 
        return False 

    def __repr__(self):
        return f'<User {self.username} (Role: {self.role.name})>'

