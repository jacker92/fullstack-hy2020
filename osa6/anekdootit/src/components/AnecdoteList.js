import { compareOnVotes } from './../utils/utils'
import React from 'react'
import { addVoteTo } from './../reducers/anecdoteReducer'
import { setNotification } from './../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {

  const vote = (anecdote) => {
    console.log('anecdote', anecdote)
    dispatch(addVoteTo(anecdote.id))
    dispatch(setNotification(`You voted '${anecdote.content}'`))
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
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}</div>
  )
}

export default AnecdoteList