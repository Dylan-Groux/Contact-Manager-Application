import React from "react";
import { apiRequest } from "./ApiRequest";
import CheckField from "./CheckField";
import { Oval } from "react-loader-spinner";
import './Components.css'

/// Fonction de soumission du formulaire pour créer ou mettre à jour un contact
const handleSubmit = async ({
    e,
    firstName,
    lastName,
    email,
    numberPhone,
    updating,
    existingContact,
    setErrorMessage,
    updateCallback,
    setIsLoading
}) => {
    e.preventDefault(); // Empêche le rechargement de la page par défaut du formulaire
    setErrorMessage(""); // Réinitialise les messages d'erreur
    
    // Regex pour valider les noms (pas de chiffres) et numéros de téléphone (uniquement chiffres)
    const regex = /^[a-zA-ZÀ-ÿ '-]+$/; 
    const phoneregex = /^[0-9]+$/; 

    // Champs à vérifier pour la validation avec CheckField
    const fieldsToCheck = [
        { name: "Le prénom", value: firstName },
        { name: "Le nom", value: lastName },
        { name: "le numéro de téléphone", value: numberPhone },
        { name: "l'email", value: email }
    ];

    // Validation des champs ; retourne une erreur si un champ est vide ou incorrect
    if (!CheckField({ fields: fieldsToCheck, setErrorMessage })) return;

    // Vérifie si le prénom ou le nom contiennent des chiffres
    if (!regex.test(firstName)) {
        setErrorMessage("Le prénom ne doit pas contenir de chiffres.");
        return;
    }
    if (!regex.test(lastName)) {
        setErrorMessage("Le nom ne doit pas contenir de chiffres.");
        return;
    }

    // Validation du format du numéro de téléphone (seulement chiffres)
    numberPhone = numberPhone.trim();
    if (!phoneregex.test(numberPhone)) {
        setErrorMessage("Le numéro ne doit pas contenir de lettres.");
        return;
    }

    // Validation de l'email avec regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        setErrorMessage("Please enter a valid mail.");
        return;
    }

    // Données du formulaire à envoyer à l'API
    const data = {
        firstName,
        lastName,
        email,
        numberPhone,
    };

    // Détermine l'URL et la méthode en fonction de l'opération (mise à jour ou création)
    const url = "http://127.0.0.1:5000/" + (updating ? `update_contact/${existingContact.id}` : "create_contact");
    const options = {
        method: updating ? "PATCH" : "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };

    try {
        // Envoie de la requête via apiRequest et rafraîchissement de la liste si réussie
        await apiRequest(url, options);
        updateCallback();
    } catch (error) {
        // Affiche le message d'erreur en cas de problème
        setErrorMessage(error.message || "An unknown error occurred.");
    } finally {
        // Désactive l'indicateur de chargement une fois la requête terminée
        setIsLoading(false);
    }

    updateCallback();
};

export default handleSubmit;
