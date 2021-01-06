import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {addVoteTo, addAnekdote} from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(addVoteTo(id))
  }

  const add = (e) => {
      e.preventDefault()
      const anekdote = e.target.anekdote.value
      e.target.anekdote.value = ''
      dispatch(addAnekdote(anekdote))
    }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={add}>
        <input name="anekdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App