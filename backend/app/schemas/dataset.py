from pydantic import BaseModel, ConfigDict
from typing import Optional, Dict, Any
from datetime import datetime
from uuid import UUID

class DatasetBase(BaseModel):
    name: str
    description: Optional[str] = None

class DatasetCreate(DatasetBase):
    pass

class DatasetRead(DatasetBase):
    id: str
    file_size: int
    mime_type: str
    row_count: Optional[int]
    column_count: Optional[int]
    schema_info: Optional[Dict[str, Any]]
    statistics: Optional[Dict[str, Any]]
    user_id: UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
