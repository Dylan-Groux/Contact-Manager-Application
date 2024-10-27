import React, { useState } from "react";
import handleSubmit from "./OnSubmit";
import './Components.css'

/// Formulaire pour créer ou mettre à jour un contact.
/// Utilise les propriétés `existingContact` pour pré-remplir les champs lors de la mise à jour d'un contact.
const ContactForm = ({ existingContact = {}, updateCallback }) => {
    // État pour chaque champ de formulaire
    const [firstName, setFirstName] = useState(existingContact.firstName || "");
    const [lastName, setLastName] = useState(existingContact.lastName || "");
    const [email, setEmail] = useState(existingContact.email || "");
    const [numberPhone, setNumberPhone] = useState(existingContact.numberPhone || "");

    // État pour stocker les messages d'erreur de validation
    const [errorMessage, setErrorMessage] = useState("");

    // Vérifie si le formulaire est en mode mise à jour ou création
    const updating = Object.entries(existingContact).length !== 0;

    return (
        <form 
            onSubmit={(e) => {
                // Gestion de la soumission via une fonction importée et centralisée
                handleSubmit({
                    e,
                    lastName,
                    firstName,
                    email,
                    numberPhone,
                    existingContact,
                    updateCallback,
                    updating,
                    setErrorMessage,
                });
            }} 
            className="form-container"
        >
            {/* Champ de formulaire pour le prénom */}
            <div className="label-input">
                <label htmlFor="firstName">First Name:</label>
                <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}  // Mise à jour de l'état du prénom
                />
            </div>

            {/* Champ de formulaire pour le nom de famille */}
            <div className="label-input">
                <label htmlFor="lastName">Last Name:</label>
                <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}  // Mise à jour de l'état du nom de famille
                />
            </div>

            {/* Champ de formulaire pour l'email */}
            <div className="label-input">
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}  // Mise à jour de l'état de l'email
                />
            </div>

            {/* Champ de formulaire pour le numéro de téléphone */}
            <div className="label-input">
                <label htmlFor="numberPhone">Phone Number:</label>
                <input
                    type="text"
                    id="numberPhone"
                    value={numberPhone}
                    onChange={(e) => setNumberPhone(e.target.value)}  // Mise à jour de l'état du numéro de téléphone
                />
            </div>

            {/* Affiche un message d'erreur en cas de validation incorrecte */}
            {errorMessage && <div className="errormessage">{errorMessage}</div>}

            {/* Bouton de soumission du formulaire, change dynamiquement entre "Create" et "Update" */}
            <button type="submit">{updating ? "Update" : "Create"}</button>
        </form>
    );
};

export default ContactForm;
