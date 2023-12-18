# rest_client.py

import requests
import json

url = 'http://localhost:3000/api/schools'

# Sample JSON data
data = {
    "name": "awann school",
    "status": "old",
    "startTime": "8:30am",
    "endTime": "1:30pm",
    "shift": "Morning",
    "address": {
        "town": "Nehar Kot",
        "tehsil": "Barkhan",
        "district": "Barkhan",
        "state": "Balochistan",
        "address": "address-1",
        "latitude": 29.79,
        "longitude": 69.47
    },
    "hasProjector": False,
    "hasLaptop": False,
    "organization": {
        "name": "publicschools"
    }
}

# POST request
response = requests.post(url, json=data)
print("POST Response:", response.json())

# Implement PUT, GET by ID, GET all, and DELETE requests as needed
