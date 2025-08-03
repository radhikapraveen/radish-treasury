from fastapi import APIRouter
from app.services.fx_service import get_live_fx_rates

router = APIRouter()

@router.get("/")
async def get_rates(base: str = "USD"):
    return get_live_fx_rates(base_currency=base)