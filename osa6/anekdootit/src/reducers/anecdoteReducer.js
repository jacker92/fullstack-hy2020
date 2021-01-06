/* eslint-disable no-case-declarations */

const getId = () => (100000 * Math.random()).toFixed(0)

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
  case 'ADD_ANEKDOTE':
    return [...state, action.data]
  default:
    return state
  }
}

export const addVoteTo = (id) => {
  return {
    type: 'ADD_VOTE',
    data: { id }
  }
}

export const addAnekdote = (content) => {
  return {
    type: 'ADD_ANEKDOTE',
    data: {
      content,
      votes: 0,
      id: getId()
    }
  }
}

export default reducer