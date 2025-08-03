from sqlalchemy import Column, Integer, String, Float
from app.database import Base

class NostroAccount(Base):
    __tablename__ = "nostro_accounts"
    id = Column(Integer, primary_key=True, index=True)
    bank = Column(String, index=True)
    currency = Column(String, index=True)
    balance = Column(Float)

class LiquidityAlert(Base):
    __tablename__ = "liquidity_alerts"
    id = Column(Integer, primary_key=True, index=True)
    currency = Column(String)
    message = Column(String)