from typing import Optional
from fastapi_users import schemas
from uuid import UUID

class UserRead(schemas.BaseUser[UUID]):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    is_organization_admin: bool = False

class UserCreate(schemas.BaseUserCreate):
    first_name: Optional[str] = None
    last_name: Optional[str] = None

class UserUpdate(schemas.BaseUserUpdate):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
