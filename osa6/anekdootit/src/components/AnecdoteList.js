import { compareOnVotes } from './../utils/utils'
import React from 'react'
import { addVoteTo } from './../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {

  const vote = (id) => {
    console.log('vote', id)
    dispatch(addVoteTo(id))
  }

  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()
  return (
    <div>
      {anecdotes.sort(compareOnVotes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}</div>
  )
}

export default AnecdoteList