import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { collection, addDoc } from 'firebase/firestore'
import { firestore } from '../firebase/firebaseConfig'

export default function AddContactsPage() {
  const [contacts, setContacts] = useState([{ id: uuidv4(), name: '', phone: '' }])
  const [errors, setErrors] = useState<Array<{ [key: string]: string }>>([])
  const [message, setMessage] = useState('')
  const [showError, setShowError] = useState(false)
  const [showPopup, setShowPopup] = useState(false)

  const PHONE_REGEX = /^[0-9]+$/

  const validatePhone = (phone: string) => PHONE_REGEX.test(phone)

  const validateFields = (contact: any): { [key: string]: string } => {
    const contactErrors: { [key: string]: string } = {}

    if (!contact.name.trim()) {
        contactErrors.name = 'O nome é obrigatório.'
      }
  
      if (!contact.phone.trim()) {
        contactErrors.phone = 'O telefone é obrigatório.'
      } else if (!validatePhone(contact.phone)) {
        contactErrors.phone = 'Por favor, insira apenas números no telefone.'
      }
  
      return contactErrors
    }

    const addContact = () => {
        if (contacts.length < 5) {
          const newContact = { id: uuidv4(), name: '', phone: '' }
          setContacts(prevContacts => [...prevContacts, newContact])
          setErrors([])
        }
    }

    const registerContacts = async () => {
        setErrors([])
        const newErrors: Array<{ [key: string]: string }> = []

        const validContacts = contacts.filter(contact => {
            const contactErrors = validateFields(contact)
            newErrors.push(contactErrors)
            return Object.keys(contactErrors).length === 0
        })

        const isValid = validContacts.length === contacts.length

        if (isValid) {
            setShowError(false)
            try {
            const contactsCollection = collection(firestore, 'contacts')
            await Promise.all(
                validContacts.map(async contact => {
                if (!contact.id) {
                    contact.id = uuidv4()
                }
                await addDoc(contactsCollection, {
                    id: contact.id,
                    name: contact.name,
                    phone: contact.phone
                })
                })
            )
            console.log('Contatos registrados!')
            setShowPopup(true)
            } catch (error) {
            console.error('Erro ao registrar contatos:', error)
            }
        } else {
            setShowError(true)
            setErrors(newErrors)
        }
    }

    const handleChange = (id: string, field: string, value: string) => {
        setContacts(prevContacts =>
          prevContacts.map(contact => {
            if (contact.id === id) {
              return { ...contact, [field]: value }
            }
            return contact
          })
        )
    }

    const sendMessage = () => {
        setShowPopup(false)
        console.log('Mensagem enviada: ', message)
        alert('Mensagem enviada!')
        setMessage('')
        setErrors([])
      }

      return (
        <main className="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Adicionar contatos</h2>
            </div>
            <form className="mt-8 space-y-6">
              {contacts.map((contact, index) => (
                <div key={contact.id}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Nome"
                        value={contact.name}
                        onChange={e => handleChange(contact.id, 'name', e.target.value)}
                        className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
                          errors[index]?.name ? 'border-red-500' : ''
                        }`}
                      />
                      {errors[index]?.name && <p className="text-red-500 text-xs mt-1">{errors[index].name}</p>}
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Telefone"
                        value={contact.phone}
                        onChange={e => handleChange(contact.id, 'phone', e.target.value)}
                        className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
                          errors[index]?.phone ? 'border-red-500' : ''
                        }`}
                      />
                      {errors[index]?.phone && <p className="text-red-500 text-xs mt-1">{errors[index].phone}</p>}
                    </div>
                  </div>
                </div>
              ))}
              {showError && !contacts.some((contact, index) => errors[index] && Object.keys(errors[index]).length === 0) && (
                <p className="text-red-500 text-xs mt-1">Por favor, corrija os erros antes de registrar os contatos.</p>
              )}
              {contacts.length < 5 && (
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={addContact}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Adicionar outro contato
                  </button>
                </div>
              )}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={registerContacts}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Registrar Contatos
                </button>
              </div>
            </form>
            {showPopup && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-800" onClick={() => setShowPopup(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Enviar Mensagem</h2>
                  <textarea
                    className="border border-gray-300 rounded-md w-full px-3 py-2 placeholder-gray-500 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm mb-4"
                    placeholder="Escreva sua mensagem..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                  />
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={sendMessage}
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Enviar Mensagem
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      )
    }
    