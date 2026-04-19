from typing import List, Optional
from fastapi import FastAPI, HTTPException, Query, Depends
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta

from .db import create_db_and_tables, get_session
from .models import Job as JobModel, User as UserModel
from .auth import get_password_hash, authenticate_user, create_access_token, get_current_user
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select

app = FastAPI(title="Job Portal API")

# Allow requests from the frontend dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    create_db_and_tables()
    # seed jobs if none exist
    with get_session() as session:
        statement = select(JobModel)
        existing = session.exec(statement).first()
        if not existing:
            from datetime import datetime
            now = datetime.utcnow()
            jobs = [
                JobModel(external_id='1', title='Frontend Engineer', company='Acme Corp', location='Remote', type='Full-time', salary='$90k - $120k', salaryFrom=90000, salaryTo=120000, description='Build beautiful web apps using React, TypeScript, and Tailwind CSS.', datePosted=now - timedelta(days=2), remote=True),
                JobModel(external_id='2', title='Backend Engineer', company='DataWorks', location='New York, NY', type='Full-time', salary='$110k - $140k', salaryFrom=110000, salaryTo=140000, description='Design and implement scalable APIs and services in Node.js.', datePosted=now - timedelta(days=10), remote=False),
                JobModel(external_id='4', title='DevOps Engineer', company='CloudScale', location='Austin, TX', type='Full-time', salary='$100k - $130k', salaryFrom=100000, salaryTo=130000, description='Maintain and scale our cloud infrastructure.', datePosted=now - timedelta(days=1), remote=False),
                JobModel(external_id='7', title='Full Stack Developer', company='Stackly', location='Chicago, IL', type='Full-time', salary='$95k - $125k', salaryFrom=95000, salaryTo=125000, description='Build and maintain end-to-end features.', datePosted=now - timedelta(days=15), remote=False),
            ]
            for j in jobs:
                session.add(j)
            session.commit()


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/jobs", response_model=List[JobModel])
def list_jobs(
    q: Optional[str] = Query(None, description="Search query (title, company, location)"),
    location: Optional[str] = Query(None),
    type: Optional[str] = Query(None),
    remote: Optional[bool] = Query(None),
    limit: int = Query(50, gt=0, le=200),
):
    with get_session() as session:
        statement = select(JobModel)
        results = session.exec(statement).all()
        if q:
            ql = q.lower()
            results = [j for j in results if ql in f"{j.title} {j.company} {j.location}".lower()]
        if location:
            locl = location.lower()
            results = [j for j in results if locl in (j.location or '').lower()]
        if type:
            results = [j for j in results if type.lower() in (j.type or '').lower()]
        if remote is not None:
            results = [j for j in results if bool(j.remote) == remote]
        return results[:limit]


@app.get("/jobs/{job_id}", response_model=JobModel)
def get_job(job_id: int):
    with get_session() as session:
        job = session.get(JobModel, job_id)
        if not job:
            raise HTTPException(status_code=404, detail="Job not found")
        return job


@app.get("/search")
def suggestions(q: str = Query(..., min_length=1), limit: int = Query(6, gt=0, le=20)):
    ql = q.lower()
    out = []
    with get_session() as session:
        statement = select(JobModel)
        for j in session.exec(statement):
            hay = f"{j.title} {j.company} {j.location}".lower()
            score = sum(1 for token in ql.split() if token in hay)
            if score > 0:
                out.append((score, j))
    out.sort(key=lambda x: -x[0])
    return [{"id": str(j.id), "label": f"{j.title} — {j.company}"} for _, j in out[:limit]]


@app.post('/auth/register')
def register(username: str, password: str):
    with get_session() as session:
        from sqlmodel import select
        statement = select(UserModel).where(UserModel.username == username)
        existing = session.exec(statement).first()
        if existing:
            raise HTTPException(status_code=400, detail='Username already exists')
        user = UserModel(username=username, hashed_password=get_password_hash(password))
        session.add(user)
        session.commit()
        session.refresh(user)
        return {"username": user.username, "id": user.id}


@app.post('/auth/token')
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    with get_session() as session:
        user = authenticate_user(session, form_data.username, form_data.password)
        if not user:
            raise HTTPException(status_code=401, detail='Incorrect username or password')
        access_token = create_access_token(data={"sub": user.username})
        return {"access_token": access_token, "token_type": "bearer"}


@app.get('/users/me')
def me(current_user: UserModel = Depends(get_current_user)):
    return {"username": current_user.username, "id": current_user.id}
