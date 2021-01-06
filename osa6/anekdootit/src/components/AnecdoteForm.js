import React from 'react'
import { useDispatch  } from 'react-redux'
import { addAnecdote } from './../reducers/anecdoteReducer'
import { setNotification } from './../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const add = (e) => {
    e.preventDefault()
    const content = e.target.anekdote.value
    e.target.anekdote.value = ''
    dispatch(addAnecdote(content))
    dispatch(setNotification('Created new anecdote!'))
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