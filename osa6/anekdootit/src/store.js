import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteService from './services/anecdotes'
import { addAnekdote } from './reducers/anecdoteReducer'


const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notifications: notificationReducer,
  filters: filterReducer
})

const store = createStore(reducer, composeWithDevTools())

anecdoteService.getAll().then(anecdotes =>
  anecdotes.forEach(anecdote => {
    store.dispatch(addAnekdote(anecdote.content))
  })
)

export default store