import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnekdote } from './../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const add = (e) => {
      e.preventDefault()
      const anekdote = e.target.anekdote.value
      e.target.anekdote.value = ''
      dispatch(addAnekdote(anekdote))
    }
  
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={add}>
          <input name="anekdote" />
          <button type="submit">create</button>
        </form>
      </div>
    )
  }

  export default AnecdoteForm