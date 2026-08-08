import uuid
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.db.database import get_async_session
from app.models.user import User
from app.models.experiment import Experiment
from app.schemas.experiment import ExperimentRead, ExperimentCreate
from app.core.auth import current_active_user

router = APIRouter()

@router.post("/", response_model=ExperimentRead, status_code=status.HTTP_201_CREATED)
async def create_experiment(
    exp_in: ExperimentCreate,
    session: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user)
):
    experiment = Experiment(
        id=str(uuid.uuid4()),
        name=exp_in.name,
        description=exp_in.description,
        project_id=exp_in.project_id,
        user_id=user.id,
        status="created"
    )
    session.add(experiment)
    await session.commit()
    await session.refresh(experiment)
    return experiment

@router.get("/", response_model=List[ExperimentRead])
async def list_experiments(
    project_id: str = None,
    session: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user)
):
    query = select(Experiment).where(Experiment.user_id == user.id)
    if project_id:
        query = query.where(Experiment.project_id == project_id)
        
    result = await session.execute(query)
    return result.scalars().all()

@router.get("/{experiment_id}", response_model=ExperimentRead)
async def get_experiment(
    experiment_id: str,
    session: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user)
):
    result = await session.execute(
        select(Experiment).where(Experiment.id == experiment_id, Experiment.user_id == user.id)
    )
    experiment = result.scalar_one_or_none()
    if not experiment:
        raise HTTPException(status_code=404, detail="Experiment not found")
    return experiment

@router.get("/{experiment_id}/metrics")
async def get_experiment_metrics(
    experiment_id: str,
    session: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user)
):
    result = await session.execute(
        select(Experiment).where(Experiment.id == experiment_id, Experiment.user_id == user.id)
    )
    experiment = result.scalar_one_or_none()
    if not experiment:
        raise HTTPException(status_code=404, detail="Experiment not found")
        
    from app.services.mlflow_service import MLflowService
    metrics_history = MLflowService.get_experiment_metrics_history(experiment_id)
    return {"metrics": metrics_history}
