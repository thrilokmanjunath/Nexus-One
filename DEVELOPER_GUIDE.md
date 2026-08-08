# Developer Guide

## Local Backend Setup
1. Install `uv`: `curl -LsSf https://astral.sh/uv/install.sh | sh`
2. Navigate to `backend/` and run `uv sync`
3. Run the development server: `uv run uvicorn app.main:app --reload`
4. Run tests: `uv run pytest`

## Local Frontend Setup
1. Navigate to `frontend/`
2. Run `npm install`
3. Start the dev server: `npm run dev`
4. Lint code: `npm run lint`

## Adding a new AI Agent
We use a modular architecture for AI Agents located in `backend/app/agents/`.
1. Create a new class extending the base `Agent` interface.
2. Register the agent in `backend/app/api/endpoints/agents.py`.
3. Add appropriate pydantic models in `backend/app/schemas/agents.py`.
