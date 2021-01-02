import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
    const [persons, setPersons] = useState([])

    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [newFilter, setFilterValue] = useState('')

    const getData = () => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
            })
    }

    useEffect(getData, []);

    const addName = (e) => {
        e.preventDefault();

        if (persons.some(p => p.name === newName)) {
            alert(`${newName} is already added to phonebook`);
        } else {
            setPersons(persons.concat(
                {
                    name: newName,
                    number: newPhone
                }));
        }

    }

    const handleNameChange = (e) => {
        setNewName(e.target.value);
    }

    const handlePhoneChange = (e) => {
        setNewPhone(e.target.value);
    }

    const handleFilterChange = (e) => {
        setFilterValue(e.target.value);
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <PhoneBookFilter handleFilterChange={handleFilterChange} />
            <h2>Add new</h2>
            <PhoneBookForm addName={addName} handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange} />
            <h3>Numbers</h3>
            <PersonDisplay persons={persons} filterValue={newFilter} />
        </div>
    )

}

const PhoneBookFilter = ({ handleFilterChange }) => {
    return (
        <div>
            Filter shown with
            <input type="text" onChange={handleFilterChange} />
        </div>
    )
}

const PhoneBookForm = ({ addName, handleNameChange, handlePhoneChange }) => {
    return (
        <>
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

const PersonDisplay = ({ persons, filterValue }) => {
    return (
        <div>
            {persons.map(x => (
                x.name.toUpperCase().indexOf(filterValue.toUpperCase()) !== -1) ?
                <Person key={x.name} name={x.name} number={x.number} /> :
                ""
            )}
        </div>
    )
}
const Person = ({ name, number }) => {
    return (
        <p>{name} {number}</p>
    )
}

export default App