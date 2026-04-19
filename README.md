# COMPKAR Monorepo

## About the Project

COMPKAR is a full-stack question practice platform designed to help users prepare for exams through daily practice questions. The platform provides an interactive interface to solve questions, track progress, and organize practice by topics and syllabus sections.

## Project Structure

Project is split into two folders:

- `backend/`: Django backend, database models, admin, auth, question engine
- `frontend/`: React + Tailwind + shadcn-style UI

## Run Backend

```bash
d:/Compkar/.venv/Scripts/python.exe backend/manage.py migrate
d:/Compkar/.venv/Scripts/python.exe backend/manage.py runserver
```

## Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend URL: http://127.0.0.1:5173
Backend URL: http://127.0.0.1:8000

Admin is available only on backend at `/admin/`.
