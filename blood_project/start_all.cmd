\
@echo off
echo Setting up backend virtualenv, installing dependencies, migrating DB, and starting servers...
cd backend
if not exist venv (
  python -m venv venv
  call venv\Scripts\activate
  pip install -r requirements.txt
) else (
  call venv\Scripts\activate
)
python manage.py migrate
start "" cmd /k "python manage.py runserver"
cd ..\frontend
echo Installing frontend deps...
npm install
start "" cmd /k "npm run dev"
echo All started. Frontend: http://localhost:5173 Backend: http://localhost:8000
