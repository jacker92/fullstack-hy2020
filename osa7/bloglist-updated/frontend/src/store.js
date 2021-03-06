import { applyMiddleware, combineReducers, createStore } from 'redux'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import credentialReducer from './reducers/credentialReducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
  notifications: notificationReducer,
  blogs: blogReducer,
  credential: credentialReducer,
  users: userReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store