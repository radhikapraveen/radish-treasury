import requests

def get_live_fx_rates(base_currency="USD", symbols=["INR", "EUR", "GBP"]):
    url = f"https://api.exchangerate.host/latest?base={base_currency}&symbols={','.join(symbols)}"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        return data["rates"]
    else:
        return {"error": "Failed to fetch rates"}