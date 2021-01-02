import React, { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])
    const [newName, setNewName] = useState('')

    const addName = (e) => {
        e.preventDefault();

        if (persons.some(p => p.name === newName)) {
            alert(`${newName} is already added to phonebook`);
        } else {
            setPersons(persons.concat(
                {
                    name: newName
                }));
        }

    }

    const handleNameChange = (e) => {
        setNewName(e.target.value);
    }

    return (
        <div>
            <PhonebookForm addName={addName} handleNameChange={handleNameChange} />
            <PersonDisplay persons={persons} />
        </div>
    )

}

const PhonebookForm = ({ addName, handleNameChange }) => {
    return (
        <>
            <h2>Phonebook</h2>
            <form onSubmit={addName}>
                <div>
                    name: <input onChange={handleNameChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>
    )
}

const PersonDisplay = ({ persons }) => {
    return (
        <div>
            <h2>Numbers</h2>
            {persons.map(x => <Person key={x.name} name={x.name} />)}
        </div>

    )
}
const Person = ({ name }) => {
    return (
        <p>{name}</p>
    )
}

export default App