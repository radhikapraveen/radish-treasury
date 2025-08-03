from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.models import NostroAccount, LiquidityAlert

def get_liquidity_overview():
    db: Session = SessionLocal()
    accounts = db.query(NostroAccount).all()
    alerts = db.query(LiquidityAlert).all()

    nostro_accounts = [
        {"bank": acct.bank, "currency": acct.currency, "balance": acct.balance}
        for acct in accounts
    ]
    alert_messages = [a.message for a in alerts]

    return {
        "nostro_accounts": nostro_accounts,
        "alerts": alert_messages,
        "upcoming_needs": {
            "USD": 1000000,
            "INR": 6000000
        }
    }