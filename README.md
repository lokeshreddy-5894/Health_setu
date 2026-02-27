# HealthSetu (Render + PostgreSQL)

## Run locally

1. Install dependencies:
   `npm install`
2. Create `.env` from `.env.example` and set `DATABASE_URL`.
3. Start app:
   `npm start`
4. Check:
   - `http://localhost:10000/health`
   - `http://localhost:10000/health/db`

## Deploy on Render

1. Push this repo to GitHub.
2. In Render, create a new **Web Service** from the repo.
3. Render will detect `render.yaml`.
4. In service Environment, set:
   - `DATABASE_URL` = your PostgreSQL connection string.
5. Deploy.

After deploy, verify:
- `/health` (service is up)
- `/health/db` (PostgreSQL connection is working)
