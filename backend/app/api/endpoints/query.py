import uuid

from fastapi import APIRouter, Depends, HTTPException, Request

from app.schemas.query import QueryRequest, QueryResponse
from app.services.query_engine import QueryEngine
from app.core.auth import current_active_user
from app.models.user import User

router = APIRouter()
engine = QueryEngine()


@router.post("/query", response_model=QueryResponse)
async def process_query(
    request: Request, 
    query_request: QueryRequest, 
    user: User = Depends(current_active_user)
):
    tenant_id = "tenant-123"  # In a real multi-tenant app, this comes from user.organization_id
    user_id = str(user.id)
    correlation_id = str(uuid.uuid4())

    try:
        response = await engine.process_query(
            req=query_request,
            correlation_id=correlation_id,
            tenant_id=tenant_id,
            user_id=user_id,
        )
        return response
    except ValueError as e:
        if str(e) == "UNAUTHORIZED_OPERATION":
            raise HTTPException(
                status_code=403,
                detail="Operation not permitted or unsafe query detected.",
            )
        raise HTTPException(status_code=400, detail=str(e))
    except Exception:  # noqa: BLE001
        raise HTTPException(status_code=500, detail="INTERNAL_SERVER_ERROR")
