import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import DisplayForm from './components/DisplayForm'
import CreateNewForm from './components/CreateNewForm'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const token = window.localStorage.getItem('token')
    if (token) {
      const asJson = JSON.parse(token)
      setUser(asJson)
      blogService.setToken(asJson)
    }
  }, [])

  const logout = () => {
    window.localStorage.setItem('token', null)
    setUser()
  }

  if (!user) {
    return (
      <LoginForm setUser={setUser} />
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <DisplayForm user={user} blogs={blogs} logout={logout} />
      <CreateNewForm createNew={async blog => await blogService.create(blog)} />
    </div>
  )
}

export default App