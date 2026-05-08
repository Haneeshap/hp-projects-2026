from typing import Optional
from sqlmodel import SQLModel, Field
from datetime import datetime


class Job(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    external_id: Optional[str] = None
    title: str
    company: str
    location: str
    type: str
    salary: Optional[str] = None
    salaryFrom: Optional[int] = None
    salaryTo: Optional[int] = None
    description: str
    datePosted: Optional[datetime] = None
    remote: Optional[bool] = False


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(index=True, unique=True)
    hashed_password: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

