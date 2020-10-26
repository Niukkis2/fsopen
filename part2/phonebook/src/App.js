import React, { useEffect, useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [matcher, setMatcher] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(persons => setPersons(persons))
  }, [])

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleMatcherChange = (event) => {
    setMatcher(event.target.value)
  }

  const handleClick = (name, id) => {
    console.log('name: ', name)
    console.log('id: ', id)
    if (window.confirm(`Delete ${name}?`)) {
      personService
      .deleteItem(id)
      .then(
        personService.getAll()
        .then(persons => setPersons(persons))
      )
    }
  }

  const updateNumber = (person) => {
    if (window.confirm(`${person.name} is already added to the phonebook, replace the old number with a new one?`)) {
      const personNewNumber = {name: person.name, number: newNumber, id: person.id}
      personService
        .update(person.id, personNewNumber)
        .then(response => {
          setPersons(persons.map(p => p.id !== response.id ? p : response))
        })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    const filtered = persons.filter(o => o.name === nameObject.name)
    if (filtered.length === 1) {
      updateNumber(filtered[0])
    } else {
      personService
        .create(nameObject)
        .then(() => {
          personService
            .getAll()
            .then(persons => setPersons(persons))
        })
    }
    setNewName('')
    setNewNumber('')
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
      <Persons persons={persons} 
               matcher={matcher}
               onClick={handleClick} />
    </div>
  )
}

export default App
