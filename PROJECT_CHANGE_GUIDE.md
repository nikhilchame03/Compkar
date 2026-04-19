# COMPKAR Change Guide

Use this file as the first reference for future edits.

## 1. Current Architecture

- Backend folder: `backend`
- Frontend folder: `frontend`
- Backend serves:
  - GraphQL API at `/graphql/`
  - Django admin at `/admin/`
- Backend root `/` intentionally has no frontend page.
- Frontend runs separately on `http://localhost:5173`.

## 2. Key Rules (Current Project Decisions)

- Frontend is student-facing (browse questions/topics/daily), not admin CRUD.
- Admin data management belongs to Django admin/backend only.
- Frontend uses GraphQL for data fetching.
- Frontend and backend are separated physically and by runtime ports.

## 3. High-Impact Files (Read These First)

### Backend API and GraphQL

- `backend/compkar/settings.py`
  - GraphQL app config, CORS config, DB config, installed apps.
- `backend/compkar/urls.py`
  - Route map for `/admin/` and `/graphql/`.
- `backend/compkar_graphql/schema.py`
  - Root schema wiring.
- `backend/compkar_graphql/queries.py`
  - Query definitions.
- `backend/compkar_graphql/mutations.py`
  - Mutation definitions (backend CRUD capability).
- `backend/compkar_graphql/mutataions.py`
  - Alias file requested by user.

### Frontend GraphQL and View Layer

- `frontend/src/lib/apollo.ts`
  - GraphQL endpoint URL used by frontend.
- `frontend/src/graphql/queries.ts`
  - Student-facing query documents.
- `frontend/src/graphql/mutations.ts`
  - Mutation docs (currently not used by student UI).
- `frontend/src/pages/PracticeDashboard.tsx`
  - Main student dashboard composition.
- `frontend/src/components/practice/PracticeHeader.tsx`
- `frontend/src/components/practice/PracticeFilters.tsx`
- `frontend/src/components/practice/TopicList.tsx`
- `frontend/src/components/practice/DailyQuestions.tsx`
- `frontend/src/components/practice/QuestionTable.tsx`
- `frontend/src/styles/practice.css`
  - Dedicated styling for the student dashboard.
- `frontend/src/App.tsx`
  - App entry currently rendering PracticeDashboard only.

## 4. Common Change Recipes

### A) Add new field to frontend question cards

1. Add field to GraphQL query in `frontend/src/graphql/queries.ts` (`GET_QUESTIONS`).
2. Ensure backend GraphQL type exposes that field in `backend/compkar_graphql/queries.py`.
3. Render field in `frontend/src/components/practice/QuestionTable.tsx`.

### B) Add new filter (for example Subject filter)

1. Add filter state in `frontend/src/pages/PracticeDashboard.tsx`.
2. Add UI control in `frontend/src/components/practice/PracticeFilters.tsx`.
3. Extend filtering logic in `filteredQuestions` useMemo.

### C) Add a new GraphQL entity

1. Add/adjust Django model in `backend/questions/models.py`.
2. Create migration and migrate.
3. Add GraphQL type + query resolver in `backend/compkar_graphql/queries.py`.
4. Add mutations in `backend/compkar_graphql/mutations.py`.
5. Add frontend query in `frontend/src/graphql/queries.ts`.
6. Render in a new frontend component under `frontend/src/components/practice/`.

### D) Change GraphQL endpoint or backend host

- Edit `frontend/src/lib/apollo.ts`.

## 5. Run Commands

### Backend

From repo root:

- `d:/Compkar/.venv/Scripts/python.exe backend/manage.py runserver`

### Frontend

- `cd frontend`
- `npm run dev`

### Frontend build check

- `cd frontend`
- `npm run build`

## 6. Data Ownership

- Content creation/editing is expected from backend admin and/or backend GraphQL.
- Frontend currently focuses on read/browse/practice flow.

## 7. Quick Debug Checklist

- If frontend cannot fetch data:
  - Confirm backend is running on `127.0.0.1:8000`.
  - Confirm GraphQL endpoint responds at `/graphql/`.
  - Confirm CORS origins in `backend/compkar/settings.py` include `localhost:5173`.
- If schema errors appear:
  - Check `backend/compkar_graphql/schema.py` imports.
  - Check field names in frontend queries match Graphene auto-camel-case output.

## 8. Intent for Future Edits

For faster future updates, start by reading this file first, then edit only the mapped files relevant to the requested change.
