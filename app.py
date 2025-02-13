import os
from flask import Flask, render_template, request, redirect, session, flash
from flask_sqlalchemy import SQLAlchemy
from models import db, User, Role
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash, check_password_hash
import secrets
import requests
from datetime import datetime, timedelta


app = Flask(__name__, template_folder='app/templates')

# Configuración de MySQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost/loginpython'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = secrets.token_hex(16)
RECAPTCHA_SECRET_KEY = '6LeAWqIqAAAAAHN_qJsp1YSDqMUXZAIBi9e61VJz'

db.init_app(app)
migrate = Migrate(app, db)

MAX_FAILED_ATTEMPTS = 5  
LOCK_TIME_LIMIT = timedelta(minutes = 1)  # Tiempo de bloqueo después de exceder los intentos

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    username_error = None
    password_error = None
    captcha_error = None

    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        recaptcha_response = request.form.get('g-recaptcha-response')

        if not validate_recaptcha(recaptcha_response):
             captcha_error = 'Verificación de CAPTCHA fallida. Intente de nuevo.'
             return render_template('login.html', username_error=username_error, password_error=password_error, captcha_error=captcha_error)

        

        # Verificar si la cuenta está bloqueada
        user = User.query.filter_by(username=username).first()
        if user:
            if user.failed_attempts >= 5:
                lockout_period = timedelta(minutes = 1)
                if datetime.utcnow() - user.last_failed_attempt < lockout_period:
                    flash('Cuenta bloqueada. Intente de nuevo en 5 minutos.', 'lockout')
                    return render_template('login.html', username_error=username_error, password_error=password_error)

        if not username:
            username_error = 'El campo usuario es obligatorio'

        if not password:
            password_error = 'El campo contraseña es obligatorio'    

        if not username_error and not password_error:
            user = User.query.filter_by(username=username).first()

            if user:
                if user.password == password:
                    session['user_id'] = user.id
                    session['role_id'] = user.id_rol
                    user.failed_attempts = 0
                    db.session.commit()
                    if user.id_rol == 1:
                        return render_template('administrador.html')
                    elif user.id_rol == 2:
                        return render_template('estudiante.html')
                    else:
                        return render_template('docente.html')
                else:
                    user.failed_attempts +=1
                    user.last_failed_attempt = datetime.utcnow()
                    db.session.commit() 
                    password_error = '"Contraseña no válida"'
            else:
                username_error = '"El nombre de usuario es incorrecto"'

    return render_template('login.html', username_error=username_error, password_error=password_error)

@app.route('/administrador')
def admin():
    return render_template('administrador.html')

@app.route('/estudiante')
def estudiante():
    return render_template('estudiante.html')

@app.route('/contrasena')
def contrasena():
    return render_template('contrasena.html')


@app.route('/docente')
def docente():
    return render_template('docente.html')

def validate_recaptcha(recaptcha_response):
    """Valida el reCAPTCHA con la API de Google."""
    payload = {
        'secret': RECAPTCHA_SECRET_KEY,
        'response': recaptcha_response
    }
    try:
        # Enviar la solicitud a Google para verificar la respuesta
        response = requests.post('https://www.google.com/recaptcha/api/siteverify', data=payload)
        result = response.json()
        # Verifica si la respuesta fue exitosa
        return result.get('success', False)
    except requests.exceptions.RequestException as e:
        print(f"Error en la conexión con la API de reCAPTCHA: {e}")
        return False  # Si hay un error en la conexión, considera que la validación ha fallado


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000, threaded=True)
