from fastapi import APIRouter
from app.api.endpoints import query, auth, datasets, projects, experiments, metrics, agents, pipelines

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth")
api_router.include_router(datasets.router, prefix="/datasets", tags=["datasets"])
api_router.include_router(projects.router, prefix="/projects", tags=["projects"])
api_router.include_router(experiments.router, prefix="/experiments", tags=["experiments"])
api_router.include_router(agents.router, prefix="/agents", tags=["agents"])
api_router.include_router(pipelines.router, prefix="/pipelines", tags=["pipelines"])
api_router.include_router(query.router, prefix="/query", tags=["query"])
api_router.include_router(metrics.router, prefix="/metrics", tags=["metrics"])
