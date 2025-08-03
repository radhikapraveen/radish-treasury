@echo off
call env\Scripts\activate
pip install -r requirements.txt
pip install psycopg2-binary sqlalchemy
python init_db.py
python seed_data.py
uvicorn app.main:app --reload
pause