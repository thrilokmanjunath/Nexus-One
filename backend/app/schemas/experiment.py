from pydantic import BaseModel, ConfigDict
from typing import Optional, Dict, Any
from datetime import datetime
from uuid import UUID

class ExperimentBase(BaseModel):
    name: str
    description: Optional[str] = None
    project_id: str

class ExperimentCreate(ExperimentBase):
    pass

class ExperimentRead(ExperimentBase):
    id: str
    status: str
    metrics: Optional[Dict[str, Any]]
    parameters: Optional[Dict[str, Any]]
    user_id: UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
