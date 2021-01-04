import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
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
      <h2>blogs</h2>
      <p><b>{user.username}</b> has logged in</p>
      <button onClick={logout}>Logout</button>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App