from enum import Enum
from typing import Any

from pydantic import BaseModel, Field


class QueryMode(str, Enum):
    natural = "natural"
    expert = "expert"
    headless = "headless"


class QueryRequest(BaseModel):
    mode: QueryMode
    query: str = Field(..., min_length=1, max_length=2000)
    contextOverrides: dict[str, str] | None = None


class QueryMeta(BaseModel):
    mode: str
    provenance: str
    freshnessMs: int
    confidenceScore: float
    isFallback: bool


class QueryResponse(BaseModel):
    data: Any
    meta: QueryMeta
