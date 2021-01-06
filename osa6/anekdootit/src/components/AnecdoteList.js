import { compareOnVotes } from './../utils/utils'
import React from 'react'
import { addVote } from './../reducers/anecdoteReducer'
import { setNotification } from './../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {

  const vote = (anecdote) => {
    props.addVote(anecdote)
    props.setNotification(`You voted '${anecdote.content}'`, 5)
  }

  const anecdotesToShow = () => {
    return props.anecdotes.filter(x => x.content.includes(props.filters))
  }

  return (
    <div>
      {anecdotesToShow().sort(compareOnVotes).map(anecdote =>
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filters: state.filters
  }
}

const mapDispatchToProps = {
  addVote,
  setNotification
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList