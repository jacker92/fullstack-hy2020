import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import Select from 'react-select';

const SetBirthyear = ({ authors }) => {
    const options = authors.map(x => {
        return {
            value: x.name,
            label: x.name
        }
    })

    const [born, setBorn] = useState('')
    const [selectedAuthor, setSelectedAuthor] = useState(options[0])

    const EDIT_AUTHOR = gql`
    mutation editAuthor($name: String!, $setBornTo: Int!) {
      editAuthor(
        name: $name,
        setBornTo: $setBornTo
      ) {
        name
      }
    }
  `

    const [editAuthor] = useMutation(EDIT_AUTHOR)

    const submit = async (event) => {
        event.preventDefault()

        editAuthor({ variables: { name: selectedAuthor.value, setBornTo: Number(born) } })
        setBorn('')
    }

    return (
        <div>
            <h2>Set birthyear</h2>
            <form onSubmit={submit}>
                <Select
                    value={selectedAuthor}
                    onChange={(e) => setSelectedAuthor(e)}
                    options={options}
                />
                <div>
                    born
            <input
                        value={born}
                        onChange={({ target }) => setBorn(target.value)}
                    />
                </div>
                <button type='submit'>Update author</button>
            </form>
        </div>
    )
}

export default SetBirthyear