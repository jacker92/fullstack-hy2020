import React, { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')

    const addName = (e) => {
        e.preventDefault();

        if (persons.some(p => p.name === newName)) {
            alert(`${newName} is already added to phonebook`);
        } else {
            setPersons(persons.concat(
                {
                    name: newName,
                    phone: newPhone
                }));
        }

    }

    const handleNameChange = (e) => {
        setNewName(e.target.value);
    }

    const handlePhoneChange = (e) => {
        setNewPhone(e.target.value);
    }

    return (
        <div>
            <PhonebookForm addName={addName} handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange} />
            <PersonDisplay persons={persons} />
        </div>
    )

}

const PhonebookForm = ({ addName, handleNameChange, handlePhoneChange }) => {
    return (
        <>
            <h2>Phonebook</h2>
            <form onSubmit={addName}>
                <div>
                    name: <input onChange={handleNameChange} />
                </div>
                <div>
                    phone: <input onChange={handlePhoneChange} />
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
            {persons.map(x => <Person key={x.name} name={x.name} phone={x.phone}/>)}
        </div>

    )
}
const Person = ({ name, phone }) => {
    return (
        <p>{name} {phone}</p>
    )
}

export default App