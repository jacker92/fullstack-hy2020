import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import './app.css'

const App = () => {
    const [persons, setPersons] = useState([])

    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [newFilter, setFilterValue] = useState('')
    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState('')

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
            .then(res => {
                console.log(res)
                setPersons(persons.concat(res));
                setMessage(`Added ${res.name}`)
                setMessageType("success")
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
            })
    }

    const updatePerson = (duplicatePerson) => {
        const result = window.confirm(`${newName} is already added to phonebook, replace the 
                                       old number with a new one?`)
        if (!result) {
            return;
        }

        const changedPerson = { ...duplicatePerson, number: newPhone };

        personService
            .update(changedPerson.id, changedPerson)
            .then(res => {
                console.log(res)
                setMessage(`Updated ${changedPerson.name}`)
                setMessageType("success")
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
            })
            .catch(error => {
                console.log("Error", error)
                setMessage(`${changedPerson.name} has already been removed from server`)
                setMessageType("error")
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
            }
            );

        const filteredArray = persons.filter(x => x.id !== changedPerson.id);
        setPersons(filteredArray.concat(changedPerson));
    }

    const removePerson = (person) => {
        const result = window.confirm(`Delete ${person.name}?`);

        if (!result) {
            return;
        }

        personService
            .remove(person.id)
            .then(res => {
                setMessage(`Removed ${person.name}`)
                setMessageType("success")
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
            });

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
            <Notification message={message} type={messageType} />
            <PhoneBookFilter handleFilterChange={handleFilterChange} />
            <h2>Add new</h2>
            <PhoneBookForm addPerson={addPerson} handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange} />
            <h3>Numbers</h3>
            <PersonDisplay persons={persons} filterValue={newFilter} removePerson={removePerson} />
        </div>
    )
}

const Notification = ({ message, type }) => {
    if (!message) {
        return null
    }

    const className = type === "error" ? "error" : "success";
    return (
        <div className={className}>
            {message}
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