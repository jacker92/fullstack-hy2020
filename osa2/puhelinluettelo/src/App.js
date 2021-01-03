import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
    const [persons, setPersons] = useState([])

    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [newFilter, setFilterValue] = useState('')

    const getData = () => {
        personService
            .getAll()
            .then(response => {
                setPersons(response)
            })
    }

    useEffect(getData, []);

    const addPerson = (e) => {
        e.preventDefault();

        const duplicate = persons.find(p => p.name === newName);
        
        if (duplicate) {
            updatePerson(duplicate);
            return;
        }

        var newPerson = {
            name: newName,
            number: newPhone
        }

        personService
            .create(newPerson)
            .then(response => {
                setPersons(persons.concat(response));
            })
    }

    const updatePerson = (duplicatePerson) => {
        const result = window.confirm(`${newName} is already added to phonebook, replace the 
                                       old number with a new one?`)
        if (!result) {
            return;
        }

        const changedPerson = { ...duplicatePerson, number: newPhone};

              personService
              .update(changedPerson.id, changedPerson)
              .then(res => console.log(res));

        const filteredArray = persons.filter(x => x.id !== changedPerson.id);      
        setPersons(filteredArray.concat(changedPerson));    
    }

    const removePerson = (person) => {
        const result = window.confirm(`Delete ${person.name}?`);

        if (!result) {
            return;
        }

        personService
            .remove(person.id);

        setPersons(persons.filter(x => x.id !== person.id));
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
            <PhoneBookForm addPerson={addPerson} handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange} />
            <h3>Numbers</h3>
            <PersonDisplay persons={persons} filterValue={newFilter} removePerson={removePerson} />
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

const PhoneBookForm = ({ addPerson, handleNameChange, handlePhoneChange }) => {
    return (
        <>
            <form onSubmit={addPerson}>
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

const PersonDisplay = ({ persons, filterValue, removePerson }) => {
    const filtered = persons.filter(x => x.name.toUpperCase().indexOf(filterValue.toUpperCase()) !== -1);
    return (
        <div>
            {filtered.map(x => (
                <Person key={x.id} person={x} removePerson={removePerson} />
            ))}
        </div>
    )
}
const Person = ({ person, removePerson }) => {
    return (
        <p>{person.name} {person.number}
            <button onClick={() => removePerson(person)}>remove</button>
        </p>
    )
}

export default App