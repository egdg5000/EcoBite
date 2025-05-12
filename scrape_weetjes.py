import requests
from bs4 import BeautifulSoup
import json

url = "https://earth.org/facts-about-food-waste/"

response = requests.get(url)

if response.status_code == 200:
    print("Pagina succesvol opgehaald!")
else:
    print(f"Fout bij het ophalen van de pagina: {response.status_code}")
    exit()

soup = BeautifulSoup(response.text, 'html.parser')

weetjes = soup.find_all('p')

weetjes_list = [weetje.get_text() for weetje in weetjes]

with open('weetjes.json', 'w', encoding='utf-8') as file:
    json.dump(weetjes_list, file, ensure_ascii=False, indent=4)

print("Weetjes zijn succesvol opgeslagen in weetjes.json")
