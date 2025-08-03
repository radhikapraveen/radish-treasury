from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import liquidity, dashboard, fx

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(liquidity.router, prefix="/liquidity", tags=["Liquidity"])
app.include_router(dashboard.router, prefix="/dashboard", tags=["Dashboard"])
app.include_router(fx.router, prefix="/fx", tags=["FX"])