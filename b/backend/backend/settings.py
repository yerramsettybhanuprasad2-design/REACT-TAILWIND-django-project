import os
from pathlib import Path
from dotenv import load_dotenv
load_dotenv()
BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = os.getenv('SECRET_KEY','django-insecure-change-me')
DEBUG = os.getenv('DEBUG','True') == 'True'
ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS','localhost,127.0.0.1').split(',')
INSTALLED_APPS = [
    'django.contrib.admin','django.contrib.auth','django.contrib.contenttypes','django.contrib.sessions','django.contrib.messages','django.contrib.staticfiles',
    'rest_framework','corsheaders','core',
]
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
ROOT_URLCONF = 'backend.urls'
TEMPLATES = [{'BACKEND':'django.template.backends.django.DjangoTemplates','DIRS':[str(BASE_DIR/'templates')],'APP_DIRS':True,'OPTIONS':{'context_processors':['django.template.context_processors.debug','django.template.context_processors.request','django.contrib.auth.context_processors.auth','django.contrib.messages.context_processors.messages',],},},]
WSGI_APPLICATION = 'backend.wsgi.application'
DATABASES = {'default': {'ENGINE': 'django.db.backends.sqlite3','NAME': str(BASE_DIR/'db.sqlite3'),}}
AUTH_PASSWORD_VALIDATORS = []
LANGUAGE_CODE='en-us';TIME_ZONE='UTC';USE_I18N=True;USE_TZ=True
STATIC_URL='/static/'; STATICFILES_DIRS=[str(BASE_DIR/'static')]
# CORS & REST
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGINS = os.getenv('CORS_ALLOWED_ORIGINS','http://localhost:5173').split(',')
REST_FRAMEWORK = {'DEFAULT_PERMISSION_CLASSES': ['rest_framework.permissions.AllowAny']}

CORS_ALLOW_ALL_ORIGINS = False

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
]

CORS_ALLOW_CREDENTIALS = True

SESSION_COOKIE_SECURE = True
SESSION_COOKIE_SAMESITE = 'None'

CSRF_COOKIE_SECURE = True
CSRF_COOKIE_SAMESITE = 'None'

CSRF_TRUSTED_ORIGINS = [
    "http://localhost:5173",
]

