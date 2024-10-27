from flask import request, jsonify
from config import app, db
from models import Contact

# Route pour obtenir tous les contacts
@app.route("/contacts", methods=["GET"])
def get_contacts():
    contacts = Contact.query.all()
    json_contacts = [contact.to_json() for contact in contacts]
    return jsonify({"contacts": json_contacts})


# Route pour créer un nouveau contact
@app.route("/create_contact", methods=["POST"])
def create_contact():
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    email = request.json.get("email")
    phone_number = request.json.get("numberPhone")
    
    if not first_name or not last_name or not email or not phone_number:
        return jsonify({"message": "You must include a first name, last name, email, and phone number"}), 400

    # Création d'une nouvelle instance de Contact avec les données reçues
    new_contact = Contact(
        first_name=first_name,
        last_name=last_name,
        email=email,
        phone_number=phone_number
    )
    
    # Tente d'ajouter et de sauvegarder le contact dans la base de données
    try:
        db.session.add(new_contact)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
    return jsonify({"message": "User created!"}), 201


# Route pour mettre à jour un contact existant par ID
@app.route("/update_contact/<int:user_id>", methods=["PATCH"])
def update_contact(user_id):
    contact = Contact.query.get(user_id)
    
    if not contact:
        return jsonify({"message": "User not found"}), 404
    
    # Requête Json qui permet de transférer les données au contact.
    data = request.json
    contact.first_name = data.get("firstName", contact.first_name)
    contact.last_name = data.get("lastName", contact.last_name)
    contact.email = data.get("email", contact.email)
    contact.phone_number = data.get("numberPhone", contact.phone_number)
    
    db.session.commit()
    
    return jsonify({"message": "User updated."}), 200


# Route pour supprimer un contact par ID
@app.route("/delete_contact/<int:user_id>", methods=["DELETE"])
def delete_contact(user_id):
    contact = Contact.query.get(user_id)
    
    if not contact:
        return jsonify({"message": "User not found"}), 404
    
    db.session.delete(contact)
    db.session.commit()
    
    return jsonify({"message": "User deleted."}), 200

# Constructeur
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    
    app.run(debug=True)
