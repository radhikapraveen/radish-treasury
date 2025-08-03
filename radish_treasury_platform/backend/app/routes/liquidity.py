from fastapi import APIRouter
from app.services.liquidity_service import get_liquidity_overview

router = APIRouter()

@router.get("/")
async def liquidity_overview():
    return get_liquidity_overview()