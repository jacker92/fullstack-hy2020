import React from 'react'
import { addAnecdote } from './../reducers/anecdoteReducer'
import { setNotification } from './../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {
  const add = (e) => {
    e.preventDefault()
    const content = e.target.anekdote.value
    e.target.anekdote.value = ''
    props.addAnecdote(content)
    props.setNotification('Created new anecdote!', 5)
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

const mapDispatchToProps = {
  addAnecdote,
  setNotification
}

const ConnectedAnecdoteForm = connect(
  null,
  mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm