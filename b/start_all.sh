#!/usr/bin/env bash
set -e
echo "Setting up backend venv and installing dependencies..."
cd backend
if [ ! -d venv ]; then
  python3 -m venv venv
  source venv/bin/activate
  pip install -r requirements.txt
else
  source venv/bin/activate
fi
python manage.py migrate &
python manage.py runserver &
echo "Starting frontend..."
cd ../frontend
npm install
npm run dev &
echo "Done. Frontend: http://localhost:5173 Backend: http://localhost:8000"
