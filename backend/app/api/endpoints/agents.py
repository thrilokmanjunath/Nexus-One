from typing import List, Dict, Any
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
import uuid

from app.db.database import get_async_session
from app.models.agent import Agent
from app.core.auth import current_active_user
from app.models.user import User

router = APIRouter()

class AgentConfig(BaseModel):
    name: str
    role: str
    goal: str
    tools: list[str] | dict | None = None

class AgentResponse(AgentConfig):
    id: str
    status: str

@router.post("/", response_model=AgentResponse)
async def create_agent(
    agent_in: AgentConfig,
    session: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user)
):
    agent = Agent(
        name=agent_in.name,
        role=agent_in.role,
        goal=agent_in.goal,
        tools=agent_in.tools,
        user_id=str(user.id)
    )
    session.add(agent)
    await session.commit()
    await session.refresh(agent)
    return agent

@router.get("/", response_model=List[AgentResponse])
async def list_agents(
    session: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user)
):
    result = await session.execute(select(Agent).where(Agent.user_id == str(user.id)))
    agents = result.scalars().all()
    return agents

@router.post("/{agent_id}/run")
async def run_agent(
    agent_id: str, 
    payload: dict,
    session: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user)
):
    result = await session.execute(select(Agent).where(Agent.id == agent_id, Agent.user_id == str(user.id)))
    agent = result.scalars().first()
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    from app.services.agent_framework import SimpleAgent
    
    agent_instance = SimpleAgent(
        name=agent.name,
        role=agent.role,
        goal=agent.goal,
        tools=[] # Assume tools are properly loaded here later
    )
    result_text = agent_instance.run(payload.get('input', ''))
    
    return {"result": result_text}
