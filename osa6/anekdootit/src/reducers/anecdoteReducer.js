/* eslint-disable no-case-declarations */
import anecdoteService from './../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'ADD_VOTE':
    const id = action.data.id
    const anecdoteToChange = state.find(n => n.id === id)
    const changedAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1
    }
    return state.map(anekdote =>
      anekdote.id !== id ? anekdote : changedAnecdote
    )
  case 'ADD_ANECDOTE':
    return [...state, action.data]
  case 'INIT_ANECDOTES':
    return action.data
  default:
    return state
  }
}

export const addVote = (anecdote) => {
  return async dispatch => {
    const changedAnecdote = {
      ...anecdote, votes: anecdote.votes + 1
    }
    await anecdoteService.update(changedAnecdote)

    dispatch({
      type: 'ADD_VOTE',
      data: { id: anecdote.id }
    })
  }

}

export const addAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.create(content)

    dispatch({
      type: 'ADD_ANECDOTE',
      data: {
        content: anecdote.content,
        votes: 0,
        id: anecdote.id
      }
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({ type: 'INIT_ANECDOTES', data: anecdotes })
  }
}

export default reducer