from pymongo import MongoClient
from os import environ

client: MongoClient = None

def _db_init():
        global client
        
        client = MongoClient(environ["DB_CONNECTION_STRING"])

# Ovdje dodavajte prototipove funckija za pristup bazi podataka koje vam trebaju.
# npr.:
# 
# def add_user(name: str, [itd.]) -> None:
#       """[Opis funkcuionalnosti ako iz imena funkcije nije očito.
#          Korsitite type-hintig za parametre i povratne vrijednosti!!!]"""
#       pass
# 
# Ja ću dalje implementirati tijela funckija da obavljaju traženu funkcionalnost.
# Ovaj modul možete importati iz bilo kojih aplikacija ovako: "import FlipMemo.database as db"
# i ne koristite privatne funkcije (one kojima ime pocinje sa '_').

if __name__ == "FlipMemo.database":
        _db_init()