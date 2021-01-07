import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import userService from './services/users'
import LoginForm from './components/LoginForm'
import DisplayForm from './components/DisplayForm'
import CreateNewForm from './components/CreateNewForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import './App.css'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const [user, setUser] = useState()
  const dispatch = useDispatch()

  const createFormRef = useRef()

  useEffect(() => {
    getTokenFromStorage()
    dispatch(initializeBlogs())
  }, [dispatch])

  const getTokenFromStorage = async () => {
    const token = window.localStorage.getItem('token')
    if (token) {
      const asJson = JSON.parse(token)
      blogService.setToken(asJson)
      const response = await userService.getByUserName(asJson.username)
      setUser(response)
    }
  }

  const logout = () => {
    window.localStorage.clear()
    setUser()
  }

  const login = async (token) => {
    blogService.setToken(token)
    const response = await userService.getByUserName(token.username)
    setUser(response)
  }

  if (!user) {
    return (
      <div>
        <Notification />
        <LoginForm login={login}/>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <DisplayForm user={user} logout={logout} />
      <Togglable buttonLabel='Create new blog' ref={createFormRef}>
        <CreateNewForm />
      </Togglable>
    </div>
  )
}

export default App