.PHONY: backend-install backend-migrate frontend-install frontend-dev build up-prod

backend-install:
	python -m venv backend/venv
	. backend/venv/bin/activate && pip install -r backend/requirements.txt

backend-migrate:
	. backend/venv/bin/activate && python backend/manage.py migrate

frontend-install:
	cd frontend && npm install

frontend-dev:
	cd frontend && npm run dev

build:
	docker-compose -f docker-compose.prod.yml up --build --abort-on-container-exit

up-prod:
	docker-compose -f docker-compose.prod.yml up -d --build
