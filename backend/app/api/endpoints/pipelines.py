from typing import List, Dict, Any, Optional
from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
import uuid
import asyncio

from app.db.database import get_async_session
from app.models.pipeline import Pipeline
from app.core.auth import current_active_user
from app.models.user import User

router = APIRouter()

class PipelineNode(BaseModel):
    id: str
    type: str
    name: str

class PipelineEdge(BaseModel):
    source: str
    target: str

class PipelineConfig(BaseModel):
    name: str
    nodes: List[PipelineNode]
    edges: Optional[List[PipelineEdge]] = None

class PipelineResponse(PipelineConfig):
    id: str
    status: str

@router.post("/", response_model=PipelineResponse)
async def create_pipeline(
    pipeline_in: PipelineConfig,
    session: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user)
):
    pipeline = Pipeline(
        name=pipeline_in.name,
        nodes=[node.dict() for node in pipeline_in.nodes],
        status="created",
        user_id=str(user.id)
    )
    # We can also store edges in a real system, but for now we'll focus on just nodes for simplicity, or add it to Pipeline model if it supports JSON.
    session.add(pipeline)
    await session.commit()
    await session.refresh(pipeline)
    return pipeline

@router.get("/", response_model=List[PipelineResponse])
async def list_pipelines(
    session: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user)
):
    result = await session.execute(select(Pipeline).where(Pipeline.user_id == str(user.id)))
    pipelines = result.scalars().all()
    return pipelines

async def run_dag(pipeline_id: str, nodes: List[dict], user_id: str):
    print(f"Starting DAG execution for pipeline {pipeline_id}")
    for node in nodes:
        print(f"Executing node {node.get('name')} of type {node.get('type')}")
        await asyncio.sleep(1) # Simulate execution time
    print(f"Pipeline {pipeline_id} execution completed.")
    # In a real system we would update the pipeline status in the DB

@router.post("/{pipeline_id}/execute")
async def execute_pipeline(
    pipeline_id: str,
    background_tasks: BackgroundTasks,
    session: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user)
):
    result = await session.execute(select(Pipeline).where(Pipeline.id == pipeline_id, Pipeline.user_id == str(user.id)))
    pipeline = result.scalars().first()
    if not pipeline:
        raise HTTPException(status_code=404, detail="Pipeline not found")
    
    pipeline.status = "running"
    session.add(pipeline)
    await session.commit()
    
    # Orchestrate DAG execution
    background_tasks.add_task(run_dag, pipeline.id, pipeline.nodes, str(user.id))
    return {"status": "started", "pipeline_id": pipeline_id}
