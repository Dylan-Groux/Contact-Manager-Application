import { useState, useEffect } from 'react'
import './App.css'
import ContactList from './components/ContactList'
import ContactForm from './components/ContactForm'
import { Oval } from 'react-loader-spinner'

function App() {
  
  const [contacts, setContacts] = useState([]) // État pour stocker la liste des contacts
  const [isModalOpen, setIsModalOpen] = useState(false) // État pour gérer l'ouverture/fermeture du modal
  const [currentContact, setCurrentContact] = useState({}) // État pour stocker le contact sélectionné
  const [isLoading, setIsLoading] = useState(false) // État pour gérer l'indicateur de chargement

  useEffect(() => {
    fetchContacts() // Récupérer les contacts au montage du composant
  }, [])

  // Fonction pour forcer une attente minimum (ici 2 secondes)
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Récupère la liste de contacts depuis l'API avec un délai de 2 secondes
  const fetchContacts = async () => {
    setIsLoading(true) // Activer le chargement

    try {
      const response = await fetch("http://127.0.0.1:5000/contacts") // Requête GET à l'API
      const data = await response.json() // Convertir la réponse en JSON

      await delay(200) // Attente minimum de 2 secondes

      setContacts(data.contacts) // Mettre à jour l'état avec la liste des contacts
      console.log(data.contacts) // Afficher les contacts pour vérification
    } catch (error) {
      console.error("Error while fetching contacts", error) // Gestion des erreurs
    } finally {
      setIsLoading(false) // Désactiver le chargement
    }
  }

  // Ferme le modal et réinitialise le contact courant
  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentContact({}) // Réinitialiser le contact sélectionné
  }

  // Ouvre le modal pour créer un nouveau contact si aucun autre modal n'est ouvert
  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true) // Ouvrir le modal si un autre n'est pas ouvert
  }

  // Ferme le modal et rafraîchit la liste des contacts pour refléter les changements
  const onUpdate = () => {
    closeModal() // Fermer le modal
    fetchContacts() // Rafraîchir la liste des contacts
  }

  const openEditModal = (contact) => {
    // Empêche d'ouvrir un autre modal s'il est déjà ouvert
    if (isModalOpen) return 
    setCurrentContact(contact) // Définir le contact actuel pour l'édition
    setIsModalOpen(true) // Ouvrir le modal
  }

  return (
    <div className="backgroundc1">
    {isLoading ? (
      <div className="bg-slate-500 loader-container"> {/* Ajout de la classe loader-container */}
        <Oval
          height={80}
          width={80}
          color="#4fa94d"
          ariaLabel="loading-indicator"
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
      ) : (
        <>
          <ContactList
            contacts={contacts} // Passer la liste des contacts au composant ContactList
            updateContact={openEditModal} // Passer la fonction pour mettre à jour un contact
            updateCallback={onUpdate} // Passer la fonction de rappel pour mettre à jour la liste
          />
          <button onClick={openCreateModal} className='bg-red-700'>Créer un nouveau contact</button>
        </>
      )}

      {/* Modal de création ou d'édition de contact */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times; {/* X pour fermer le modal */}
            </span>
            <ContactForm existingContact={currentContact} updateCallback={onUpdate} /> {/* Formulaire pour ajouter ou éditer un contact */}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
