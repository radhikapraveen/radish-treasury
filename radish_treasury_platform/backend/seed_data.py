from app.database import SessionLocal
from app.models.models import NostroAccount, LiquidityAlert

db = SessionLocal()

db.query(NostroAccount).delete()
db.query(LiquidityAlert).delete()

nostros = [
    NostroAccount(bank="HSBC London", currency="GBP", balance=1000000),
    NostroAccount(bank="Citi NY", currency="USD", balance=750000),
    NostroAccount(bank="ICICI India", currency="INR", balance=5500000),
    NostroAccount(bank="Deutsche Frankfurt", currency="EUR", balance=850000),
]

alerts = [
    LiquidityAlert(currency="USD", message="USD balance below buffer threshold"),
    LiquidityAlert(currency="INR", message="INR funding needed for tomorrow’s settlement"),
]

db.add_all(nostros + alerts)
db.commit()
db.close()