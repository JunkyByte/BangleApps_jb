import requests
import json

url = "https://api.openweathermap.org/data/2.5/forecast?q=Rome,it&APPID=a922cbb60cbfc575ba2226b7ff18a2aa&units=metric"

headers = {'accept': 'application/json'}

resp = requests.get(url, headers=headers)
assert resp.status_code == 200

data = resp.json()

# Take only valuable data from response and build a new json that we will save and load on device
x = {point['dt']: [point['weather'][0]['main'].lower(), round(point['main']['temp'], 1)] for point in data['list']}
print('Saving data! for future 8 days, 3 hours forecast')

with open('./weather.json', 'w') as f:
    json.dump(x, f)
