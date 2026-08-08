from fastapi_users.db import SQLAlchemyBaseUserTableUUID
from sqlalchemy import String, Boolean, Column, ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base

class User(SQLAlchemyBaseUserTableUUID, Base):
    __tablename__ = "users"
    
    first_name = Column(String(length=100), nullable=True)
    last_name = Column(String(length=100), nullable=True)
    is_organization_admin = Column(Boolean, default=False, nullable=False)
    organization_id = Column(String(36), ForeignKey("organizations.id"), nullable=True)
    
    # Relationships
    organization = relationship("Organization", backref="users", lazy="selectin")
