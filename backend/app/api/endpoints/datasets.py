import os
import uuid
import pandas as pd
from typing import List, Any
from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.db.database import get_async_session
from app.models.user import User
from app.models.dataset import Dataset
from app.schemas.dataset import DatasetRead, DatasetCreate
from app.core.auth import current_active_user

router = APIRouter()

UPLOAD_DIR = "app/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/", response_model=DatasetRead, status_code=status.HTTP_201_CREATED)
async def upload_dataset(
    name: str = Form(...),
    description: str = Form(None),
    file: UploadFile = File(...),
    session: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user)
):
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file uploaded")
    
    file_ext = os.path.splitext(file.filename)[1].lower()
    if file_ext not in [".csv", ".json", ".parquet"]:
        raise HTTPException(status_code=400, detail="Unsupported file format. Use CSV, JSON, or Parquet.")
        
    file_id = str(uuid.uuid4())
    file_path = os.path.join(UPLOAD_DIR, f"{file_id}{file_ext}")
    
    # Save file
    content = await file.read()
    with open(file_path, "wb") as f:
        f.write(content)
        
    file_size = os.path.getsize(file_path)
    
    # Profile dataset
    row_count, column_count = 0, 0
    schema_info, statistics = {}, {}
    
    try:
        if file_ext == ".csv":
            df = pd.read_csv(file_path, nrows=1000) # Read sample for profiling
        elif file_ext == ".json":
            df = pd.read_json(file_path, orient="records")
        elif file_ext == ".parquet":
            df = pd.read_parquet(file_path)
            
        row_count = len(df) # approximate if nrows=1000
        column_count = len(df.columns)
        
        for col in df.columns:
            schema_info[col] = str(df[col].dtype)
            statistics[col] = {
                "missing": int(df[col].isna().sum()),
                "unique": int(df[col].nunique())
            }
            if pd.api.types.is_numeric_dtype(df[col]):
                statistics[col]["mean"] = float(df[col].mean()) if not pd.isna(df[col].mean()) else None
                statistics[col]["min"] = float(df[col].min()) if not pd.isna(df[col].min()) else None
                statistics[col]["max"] = float(df[col].max()) if not pd.isna(df[col].max()) else None
                
    except Exception as e:
        print(f"Error profiling dataset: {e}")
        # non-fatal, we still save the dataset

    dataset = Dataset(
        id=file_id,
        name=name,
        description=description,
        file_path=file_path,
        file_size=file_size,
        mime_type=file.content_type or "application/octet-stream",
        row_count=row_count,
        column_count=column_count,
        schema_info=schema_info,
        statistics=statistics,
        user_id=user.id
    )
    
    session.add(dataset)
    await session.commit()
    await session.refresh(dataset)
    
    return dataset

@router.get("/", response_model=List[DatasetRead])
async def list_datasets(
    session: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user)
):
    result = await session.execute(select(Dataset).where(Dataset.user_id == user.id))
    return result.scalars().all()

@router.get("/{dataset_id}", response_model=DatasetRead)
async def get_dataset(
    dataset_id: str,
    session: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user)
):
    result = await session.execute(
        select(Dataset).where(Dataset.id == dataset_id, Dataset.user_id == user.id)
    )
    dataset = result.scalar_one_or_none()
    if not dataset:
        raise HTTPException(status_code=404, detail="Dataset not found")
    return dataset
