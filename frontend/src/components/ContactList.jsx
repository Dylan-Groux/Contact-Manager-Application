import React from "react";
import { apiRequestDELETE } from "./ApiRequest";
import './Components.css'

/// Composant pour afficher la liste des contacts avec des options de mise à jour et de suppression
const ContactList = ({ contacts, updateContact, updateCallback }) => {

    /// Fonction pour supprimer un contact en utilisant une requête API DELETE
    const onDelete = async (id) => {
        try {
            const options = {
                method: "DELETE"
            };
            
            // Suppression via l'appel API avec gestion des erreurs
            const response = await apiRequestDELETE(id, options, updateCallback);
    
            // Vérifie si la suppression a réussi avant d'appeler updateCallback pour actualiser la liste
            if (response.ok) {
                updateCallback(); // Actualise la liste en cas de succès de la suppression
            } else {
                // Gère les erreurs renvoyées par l'API en cas d'échec
                const errorData = await response.json();
                throw new Error(errorData.error || "An unknown error occurred.");
            }
        } catch (error) {
            setErrorMessage(error.message || "An unknown error occurred.");
            console.error("Delete error:", error);
        }
    };

    return (
        <div className="bg-black">
            <div className="contacts">
                <h2>Contacts</h2>
            </div>

            {/* Table d'affichage des contacts avec options de mise à jour et suppression */}
            <table>
                <thead>
                    <tr> 
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Génère une ligne pour chaque contact */}
                    {contacts.map((contact) => (
                        <tr key={contact.id}>
                            <td>{contact.firstName}</td>
                            <td>{contact.lastName}</td>
                            <td>{contact.email}</td>
                            <td>{contact.numberPhone}</td>
                            <td>
                                {/* Bouton pour mettre à jour le contact */}
                                <button onClick={() => updateContact(contact)}>Update</button>
                                
                                {/* Bouton pour supprimer le contact, appelle onDelete avec l'ID */}
                                <button onClick={() => onDelete(contact.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ContactList;
