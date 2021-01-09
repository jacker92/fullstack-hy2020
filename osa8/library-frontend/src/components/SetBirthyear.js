import React, {useState} from 'react'
import { gql, useMutation } from '@apollo/client'

const SetBirthyear = () => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')
  
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
  
      editAuthor({variables: {name, setBornTo: Number(born)}})
  
      setName('')
      setBorn('')
    }
  
    return(
      <div>
        <h2>Set birthyear</h2>
        <form onSubmit={submit}>
          <div>
            name
            <input
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
          </div>
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