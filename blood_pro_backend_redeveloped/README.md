Blood Pro Final v2 — Fullstack

Development (Windows):
1. Backend
   cd backend
   python -m venv venv
   venv\Scripts\activate
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py createsuperuser
   python manage.py runserver
2. Frontend (new window)
   cd frontend
   npm install
   npm run dev

Production (Docker):
- Build and run (single machine):
  docker-compose -f docker-compose.prod.yml up --build
- Or run in background:
  docker-compose -f docker-compose.prod.yml up -d --build

Utilities:
- start_all.cmd (Windows) will set up venv, migrate and start both servers in separate windows.
- start_all.sh (Unix) will attempt to do the same.
- Makefile contains common commands for Linux/macOS.
