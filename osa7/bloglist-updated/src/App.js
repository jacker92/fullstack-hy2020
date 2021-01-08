import React, { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import DisplayForm from './components/DisplayForm'
import CreateNewForm from './components/CreateNewForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import UserStatistics from './components/UserStatistics'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/credentialReducer'

const App = () => {
  const dispatch = useDispatch()
  const credential = useSelector(state => state.credential)

  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeBlogs())
  }, [dispatch])

  if (!credential.token) {
    return (
      <div>
        <Notification />
        <LoginForm/>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <DisplayForm />
      <UserStatistics />
      <Togglable buttonLabel='Create new blog'>
        <CreateNewForm />
      </Togglable>
    </div>
  )
}

export default App