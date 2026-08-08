# Nexus-One Enterprise AI Platform

Nexus-One is a production-grade Enterprise AI & Data Science Platform featuring autonomous agents, data pipelines, model tracking, and beautiful Next.js interfaces.

## Features

- **Agentic Workflows**: Multi-turn LLM-powered AI agents (Research, SQL, Data Analysis, Visualization) powered by LiteLLM.
- **Pipeline Orchestration**: React Flow DAG canvas with Python-based backend execution logic.
- **MLOps Tracking**: MLFlow integration for tracking experiments and runs.
- **Robust APIs**: FastAPI with PostgreSQL, Redis Caching, SlowAPI rate-limiting, and OpenTelemetry logging.
- **Modern UI**: Next.js 14 App Router, Tailwind CSS, Lucide Icons, glassmorphism design.
- **Security & Scale**: Dockerized setup, async SQLAlchemy, FastAPI Users authentication.

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for frontend development)
- Python 3.10+ (for backend development)

### Quick Start (Docker)

```bash
docker-compose up --build
```
This will start:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- PostgreSQL: localhost:5432
- Redis: localhost:6379

### Local Development

**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## Deployment

The project includes configurations for modern PaaS platforms:
- **Frontend**: Vercel ready via `frontend/vercel.json`
- **Backend**: Railway ready via `railway.json`

## Testing

Backend: `pytest tests/`
Frontend: `npx playwright test`
