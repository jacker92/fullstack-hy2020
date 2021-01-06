import React from 'react'
import { useDispatch  } from 'react-redux'
import { addAnekdote } from './../reducers/anecdoteReducer'
import { setNotification } from './../reducers/notificationReducer'
import anecdoteService from './../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const add = async (e) => {
    e.preventDefault()
    const content = e.target.anekdote.value
    e.target.anekdote.value = ''
    const anecdote = await anecdoteService.create(content)
    dispatch(addAnekdote(anecdote))
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