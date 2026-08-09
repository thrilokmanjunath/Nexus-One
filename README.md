<p align="center">
  <img src="https://img.shields.io/badge/Nexus--One-Enterprise%20AI%20Platform-blueviolet?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTEyIDJMMiA3bDEwIDUgMTAtNS0xMC01eiIvPjxwYXRoIGQ9Ik0yIDE3bDEwIDUgMTAtNSIvPjxwYXRoIGQ9Ik0yIDEybDEwIDUgMTAtNSIvPjwvc3ZnPg==&labelColor=1a1a2e" alt="Nexus-One" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/python-3.13+-3776AB?style=flat-square&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/FastAPI-0.141+-009688?style=flat-square&logo=fastapi&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/LiteLLM-Multi--Provider-FF6F00?style=flat-square" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" />
</p>

<p align="center">
  <b>A unified, production-grade platform for Data Science, Machine Learning, Generative AI, Multi-Agent Orchestration, and MLOps.</b>
</p>

---

# Nexus-One

Nexus-One is an enterprise AI & data science platform that brings together autonomous AI agents, visual pipeline orchestration, experiment tracking, and modern full-stack engineering into a single, deployable system.

## ✨ Key Capabilities

| Domain | What Nexus-One Provides |
|---|---|
| **Multi-Agent AI** | Autonomous agents (Research, SQL, Data Analysis, Visualization) with tool-calling, structured output, and multi-turn reasoning via LiteLLM |
| **Pipeline Orchestration** | Visual DAG canvas powered by React Flow with drag-and-drop node composition |
| **Experiment Tracking** | MLflow integration for logging parameters, metrics, and model artifacts across runs |
| **Generative AI** | Multi-provider LLM support (OpenAI, Google Gemini, Anthropic) with automatic fallback chains |
| **Data Management** | Dataset upload, versioning, and exploration with real-time metadata |
| **Modern Frontend** | Next.js 14 App Router with Tailwind CSS, Lucide icons, and glassmorphism design |
| **Production Security** | JWT authentication (FastAPI Users), mandatory secret management, rate limiting, CORS enforcement |
| **MLOps & DevOps** | Docker Compose, GitHub Actions CI, Alembic migrations, Render/Vercel/Railway deployment configs |

---

## 🏗 Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                        FRONTEND (Next.js 14)                     │
│  App Router · Tailwind CSS · React Flow · Lucide · TypeScript    │
└────────────────────────────┬─────────────────────────────────────┘
                             │ HTTPS / REST
┌────────────────────────────▼─────────────────────────────────────┐
│                        BACKEND (FastAPI)                         │
│  Async SQLAlchemy · FastAPI Users · SlowAPI · Redis Cache        │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────────────────┐  │
│  │  API Layer  │  │   Services   │  │   Agent Framework      │  │
│  │  /api/v1/*  │  │  GenAI       │  │  Research · SQL        │  │
│  │  Auth       │  │  MLflow      │  │  DataAnalysis · Viz    │  │
│  │  CRUD       │  │  Pipelines   │  │  Tool Execution        │  │
│  └─────────────┘  └──────────────┘  └────────────────────────┘  │
└─────────┬──────────────────┬──────────────────┬─────────────────┘
          │                  │                  │
    ┌─────▼─────┐    ┌──────▼──────┐    ┌──────▼──────┐
    │ PostgreSQL │    │    Redis    │    │ LLM APIs    │
    │ (Supabase) │    │   Cache    │    │ OpenAI      │
    │            │    │ Rate Limit │    │ Gemini      │
    │            │    │            │    │ Anthropic   │
    └───────────┘    └────────────┘    └─────────────┘
```

---

## 📂 Project Structure

```
Nexus-One/
├── backend/                    # FastAPI backend
│   ├── app/
│   │   ├── api/                # Route definitions
│   │   │   └── endpoints/      # auth, projects, experiments, agents, pipelines, datasets, metrics, query
│   │   ├── core/               # Config, auth, logging
│   │   ├── db/                 # Async SQLAlchemy engine & session
│   │   ├── models/             # ORM models (User, Project, Experiment, Agent, Pipeline, Dataset, Organization)
│   │   ├── schemas/            # Pydantic request/response schemas
│   │   └── services/           # Business logic
│   │       ├── genai.py        # LiteLLM multi-provider AI service
│   │       ├── agent_framework.py  # Multi-agent orchestration engine
│   │       ├── agents/         # Concrete agent implementations
│   │       └── mlflow_service.py   # MLflow experiment tracking
│   ├── alembic/                # Database migration versions
│   ├── tests/                  # Pytest async test suite
│   ├── Dockerfile
│   └── pyproject.toml          # uv / pip dependencies
│
├── frontend/                   # Next.js 14 frontend
│   ├── src/app/
│   │   ├── page.tsx            # Landing page
│   │   ├── login/              # Authentication
│   │   ├── register/           # User registration
│   │   └── dashboard/          # Protected dashboard
│   │       ├── agents/         # AI agent management
│   │       ├── assistant/      # Conversational AI assistant
│   │       ├── datasets/       # Data management
│   │       ├── experiments/    # Experiment tracking UI
│   │       ├── models/         # Model registry
│   │       ├── pipelines/      # React Flow DAG builder
│   │       └── projects/       # Project management
│   ├── tests/                  # Playwright E2E tests
│   └── vercel.json             # Vercel deployment config
│
├── .github/workflows/ci.yml   # GitHub Actions CI pipeline
├── docker-compose.yml          # Local development stack
├── docker-compose.prod.yml     # Production Docker stack
├── render.yaml                 # Render IaC deployment
├── railway.json                # Railway deployment config
└── .env.example                # Required environment variables
```

---

## 🚀 Getting Started

### Prerequisites

- **Python 3.13+** with [uv](https://docs.astral.sh/uv/) package manager
- **Node.js 20+** with npm
- **Docker & Docker Compose** (optional, for containerized development)

### 1. Clone the Repository

```bash
git clone https://github.com/thrilokmanjunath/Nexus-One.git
cd Nexus-One
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` and set the required values:

| Variable | Required | Description |
|---|---|---|
| `SECRET_KEY` | **Yes** | JWT signing key — the app will **refuse to start** without this |
| `DATABASE_URL` | Yes | PostgreSQL connection string (`postgresql+asyncpg://...`) |
| `OPENAI_API_KEY` | For AI features | OpenAI API key for LLM completions |
| `GEMINI_API_KEY` | Optional | Google Gemini fallback |
| `ANTHROPIC_API_KEY` | Optional | Anthropic fallback |
| `REDIS_URI` | Optional | Redis for caching and rate limiting |

### 3. Start with Docker (Recommended)

```bash
docker-compose up --build
```

This launches the full stack:

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8000 |
| API Docs (Swagger) | http://localhost:8000/api/v1/openapi.json |
| PostgreSQL | localhost:5432 |
| Redis | localhost:6379 |

### 4. Local Development (Without Docker)

**Backend:**

```bash
cd backend
uv sync
SECRET_KEY=your-dev-secret DATABASE_URL=sqlite+aiosqlite:///./dev.db uv run alembic upgrade head
SECRET_KEY=your-dev-secret uv run uvicorn app.main:app --reload --port 8000
```

**Frontend:**

```bash
cd frontend
npm install
npm run dev
```

---

## 🧪 Testing

### Backend

```bash
cd backend
SECRET_KEY=test-key uv run ruff check .        # Lint
SECRET_KEY=test-key uv run pytest -v            # Unit tests
```

### Frontend

```bash
cd frontend
npm run lint                                     # ESLint
npm run build                                    # TypeScript compilation + production build
npx playwright test                              # E2E tests
```

### CI Pipeline

Every push to `main` automatically runs the full backend and frontend test suites via [GitHub Actions](.github/workflows/ci.yml).

---

## 🌐 Deployment

Nexus-One ships with deployment configurations for multiple platforms:

### Vercel (Frontend)

The frontend is a standard Next.js 14 application. Deploy via the [Vercel dashboard](https://vercel.com) or CLI:

```bash
cd frontend
npx vercel --prod
```

Set `NEXT_PUBLIC_API_URL` in Vercel environment variables to point to your backend.

### Render (Backend)

The repository includes a [`render.yaml`](render.yaml) for infrastructure-as-code deployment:

1. Connect your GitHub repo in the [Render dashboard](https://render.com)
2. Render will auto-detect `render.yaml`
3. Configure `SECRET_KEY`, `DATABASE_URL`, and LLM API keys in Render's environment settings

### Docker (Self-Hosted)

For production self-hosting:

```bash
docker-compose -f docker-compose.prod.yml up --build -d
```

### Railway

Import the repository on [Railway](https://railway.app) — it will auto-detect `railway.json`.

---

## 🤖 AI & Multi-Agent System

Nexus-One's agent framework provides autonomous AI agents that can:

- **Reason** over multi-turn conversations with tool-calling capabilities
- **Execute** structured tools (web search, SQL queries, data analysis, chart generation)
- **Fall back** across LLM providers automatically (OpenAI → Gemini → Anthropic)

### Built-in Agents

| Agent | Purpose |
|---|---|
| `ResearchAgent` | Web search, document analysis, knowledge synthesis |
| `SQLAgent` | Natural language to SQL, query execution, result formatting |
| `DataAnalysisAgent` | Statistical analysis, pattern detection, insights generation |
| `VisualizationAgent` | Chart specification, data visualization recommendations |

### Provider Support (via LiteLLM)

LiteLLM abstracts over 100+ LLM providers. Nexus-One is pre-configured with:

- **OpenAI** — `gpt-4o-mini` (default), `gpt-4o`, `gpt-4-turbo`
- **Google Gemini** — `gemini/gemini-pro`
- **Anthropic** — `anthropic/claude-3-sonnet`

---

## 🔒 Security

| Measure | Implementation |
|---|---|
| Authentication | FastAPI Users with JWT bearer tokens |
| Secret Management | `SECRET_KEY` is **mandatory** — the app crashes on startup if missing |
| Rate Limiting | SlowAPI (100 requests/minute default) |
| CORS | Configurable origin allowlist via `BACKEND_CORS_ORIGINS` |
| Password Hashing | bcrypt via Passlib |
| Input Validation | Pydantic v2 schemas on all endpoints |
| SQL Injection | Parameterized queries via SQLAlchemy ORM |
| Credential Safety | `.gitignore` excludes `.env`, secrets never committed |

---

## 📊 Database & Migrations

Nexus-One uses **async SQLAlchemy** with **Alembic** for schema management.

### Models

`User` · `Project` · `Experiment` · `Dataset` · `Agent` · `Pipeline` · `Organization`

### Running Migrations

```bash
cd backend

# Apply all migrations
SECRET_KEY=your-key uv run alembic upgrade head

# Create a new migration after model changes
SECRET_KEY=your-key uv run alembic revision --autogenerate -m "describe change"

# View migration history
uv run alembic history
```

The database driver auto-detects `postgresql://` vs `postgresql+asyncpg://` and converts accordingly for Supabase / Render PostgreSQL compatibility.

---

## 🛠 Tech Stack

### Backend

| Technology | Purpose |
|---|---|
| [FastAPI](https://fastapi.tiangolo.com) | Async Python web framework |
| [SQLAlchemy 2.0](https://www.sqlalchemy.org) | Async ORM |
| [Alembic](https://alembic.sqlalchemy.org) | Database migrations |
| [LiteLLM](https://docs.litellm.ai) | Multi-provider LLM gateway |
| [MLflow](https://mlflow.org) | Experiment tracking |
| [FastAPI Users](https://fastapi-users.github.io/fastapi-users/) | Authentication |
| [SlowAPI](https://github.com/laurentS/slowapi) | Rate limiting |
| [Redis](https://redis.io) | Caching (fastapi-cache2) |
| [Pydantic v2](https://docs.pydantic.dev) | Data validation |
| [uv](https://docs.astral.sh/uv/) | Package management |
| [Ruff](https://docs.astral.sh/ruff/) | Linting & formatting |
| [Pytest](https://docs.pytest.org) | Testing |

### Frontend

| Technology | Purpose |
|---|---|
| [Next.js 14](https://nextjs.org) | React framework (App Router) |
| [TypeScript](https://www.typescriptlang.org) | Type safety |
| [Tailwind CSS](https://tailwindcss.com) | Utility-first styling |
| [React Flow](https://reactflow.dev) | Visual DAG pipeline builder |
| [Lucide](https://lucide.dev) | Icon system |
| [Playwright](https://playwright.dev) | E2E testing |

### Infrastructure

| Technology | Purpose |
|---|---|
| [Docker](https://www.docker.com) | Containerization |
| [GitHub Actions](https://github.com/features/actions) | CI/CD |
| [Vercel](https://vercel.com) | Frontend hosting |
| [Render](https://render.com) | Backend hosting |
| [Supabase](https://supabase.com) | Production PostgreSQL |

---

## 📝 API Reference

The backend exposes a RESTful API under `/api/v1`:

| Endpoint | Method | Description |
|---|---|---|
| `/` | GET | Health check |
| `/api/v1/auth/register` | POST | User registration |
| `/api/v1/auth/login` | POST | JWT login |
| `/api/v1/projects/` | GET, POST | Project CRUD |
| `/api/v1/experiments/` | GET, POST | Experiment management |
| `/api/v1/datasets/` | GET, POST | Dataset upload & listing |
| `/api/v1/agents/` | GET, POST | Agent management & execution |
| `/api/v1/pipelines/` | GET, POST | Pipeline CRUD |
| `/api/v1/metrics/` | GET | Platform metrics (Prometheus) |
| `/api/v1/query/` | POST | Natural language AI query |

Full interactive documentation is available at `/docs` (Swagger UI) when running locally.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Run tests before committing (`uv run pytest && npm run build`)
4. Commit your changes (`git commit -m 'feat: add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/thrilokmanjunath">Thrilok Manjunath</a>
</p>
