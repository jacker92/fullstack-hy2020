import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVoteTo } from './reducers/anecdoteReducer'
import { compareOnVotes } from './utils/utils'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(addVoteTo(id))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort(compareOnVotes).map(anecdote =>
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
      <AnecdoteForm />
    </div>
  )
}

export default App