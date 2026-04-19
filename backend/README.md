# COMPKAR Backend

Django backend for COMPKAR.

## Run Backend

From repository root:

```bash
d:/Compkar/.venv/Scripts/python.exe backend/manage.py migrate
d:/Compkar/.venv/Scripts/python.exe backend/manage.py runserver
```

## Admin Access Policy

- Django admin is backend-only at `http://127.0.0.1:8000/admin/`.
- Frontend has no admin route exposure.

## Environment

- Backend env file is `backend/.env`.
- Database connection is set with `DATABASE_URL`.

Example:

```env
DATABASE_URL=postgres://postgres:your_password@127.0.0.1:5433/compkar_db
```
