import React from "react";
import './Components.css'

/// Vérifie que la valeur d'un champ ne soit pas égale à 0
const isEmptyOrZero = (value) => {
    return !value || value === "0";
};

/// Vérifie si le champ est supérieur à 0 + Gestion d'erreur
const CheckField = ({ fields, setErrorMessage }) => {
    for (const field of fields) {
        if (isEmptyOrZero(field.value)) {
            setErrorMessage(`${field.name} cannot be empty or equal to zero`);
            return false;
        }
    }
    return true;
}

export default CheckField;
