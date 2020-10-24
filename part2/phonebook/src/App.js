import React, { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [matcher, setMatcher] = useState('')

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleMatcherChange = (event) => {
    setMatcher(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    if (persons.filter(o => o.name === nameObject.name).length > 0) {
      window.alert(`${nameObject.name} is already added to the phonebook`)
    } else {
      setPersons(persons.concat(nameObject))
    }
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter matcher={matcher} onMatcherChange={handleMatcherChange} />
      <h3>add a new</h3>
      <PersonForm onSubmit={addPerson}
                  name={newName} 
                  onNameChange={handleNameChange}
                  number={newNumber}
                  onNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons persons={persons} matcher={matcher} />
    </div>
  )
}

export default App
