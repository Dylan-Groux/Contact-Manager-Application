import React from "react";
import './Components.css'

/// Centralise les requêtes API entre le backend et le frontend
export const apiRequest = async (url, options) => {
    try {
        const response = await fetch(url, options)
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData || "Unknown error")
        }
        return response;
    }  catch (error) {
        console.error(error);
        alert("An error occurred: " + error.message)
        throw error;
    }
}

/// Centralise les requêtes API entre le backend et le frontend dans le cas d'une méthode DELETE
export const apiRequestDELETE = async (id, options, updateCallback) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/delete_contact/${id}`, options)
            
        // Vérifie si la suppression a réussi 
        if (response.ok) {
            updateCallback()  // Actualise la liste des contacts en appelant la fonction de rappel
        } else {
            console.error("Delete failed")  // Affiche une erreur si la suppression échoue
        } 
    } catch (error) {
        console.error(error);
        alert("An error occurred: " + error.message)
        throw error;
    }
}
