from config import db
from flask import jsonify
import re

# Définition de la classe Contact comme un modèle de base de données pour stocker les informations de contact
class Contact(db.Model):

    # Attributs du modèle
    id = db.Column(db.Integer, primary_key=True)  # Clé primaire 
    first_name = db.Column(db.String(80), unique=False, nullable=False) 
    last_name = db.Column(db.String(80), unique=False, nullable=False) 
    email = db.Column(db.String(120), unique=True, nullable=False)  
    phone_number = db.Column(db.String(15), unique=True, nullable=False) 

    # Convertit les informations de contact en format JSON pour les réponses API ou autres usages en frontend
    def to_json(self):
        return {
            "id": self.id,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "email": self.email,
            "numberPhone": self.phone_number,
        }

    # Méthode statique pour normaliser le format des numéros de téléphone
    @staticmethod
    def normalize_phone_number(phone_number):
        return re.sub(r"\D", "", phone_number)
    
    # Méthode statique pour normaliser le format de nom en évitant l'implémentation de chiffre
    @staticmethod
    def normalize_name(last_name, first_name):
        last_name_normalize = re.sub(r"\d+", "", last_name)
        first_name_normalize = re.sub(r"\d+", "", first_name)
        
        return last_name_normalize, first_name_normalize

    # Méthode statique pour valider et normaliser le format des e-mails
    @staticmethod
    def normalize_email(email):
        email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if re.match(email_regex, email):
            return email.strip().lower()  
        else:
            raise ValueError("Invalid email.")

    # Constructeur de la classe Contact, qui applique des validations et des normalisations aux e-mails et numéros de téléphone
    def __init__(self, first_name, last_name, email, phone_number):
        self.first_name, self.last_name = Contact.normalize_name(last_name, first_name)
        self.email = Contact.normalize_email(email) 
        self.phone_number = Contact.normalize_phone_number(phone_number)
