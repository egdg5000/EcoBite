import requests
from bs4 import BeautifulSoup
import json

# URL van de pagina met weetjes over voedselverspilling
url = "https://earth.org/facts-about-food-waste/"

# Haal de HTML-pagina op
response = requests.get(url)

# Controleer of de aanvraag succesvol was
if response.status_code == 200:
    print("Pagina succesvol opgehaald!")
else:
    print(f"Fout bij het ophalen van de pagina: {response.status_code}")
    exit()

# Parse de HTML-inhoud
soup = BeautifulSoup(response.text, 'html.parser')

# Zoek naar de elementen die de weetjes bevatten
# We gaan uit van de <p> tags, maar dit kan variëren afhankelijk van de pagina
weetjes = soup.find_all('p')

# Verzamel de tekst van de weetjes
weetjes_list = [weetje.get_text() for weetje in weetjes]

# Bewaar de weetjes in een JSON-bestand
with open('weetjes.json', 'w', encoding='utf-8') as file:
    json.dump(weetjes_list, file, ensure_ascii=False, indent=4)

print("Weetjes zijn succesvol opgeslagen in weetjes.json")
