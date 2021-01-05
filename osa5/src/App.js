import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import DisplayForm from './components/DisplayForm'
import CreateNewForm from './components/CreateNewForm'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState()
  const [message, setMessage] = useState()
  const [messageType, setMessageType] = useState()

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
    window.localStorage.clear()
    setUser()
  }

  const createBlog = async (event, blog) => {
    event.preventDefault()
    console.log("In Create bog", blog)
    try {
      const result = await blogService.create(blog)
      setNotification(`A new blog ${result.title} by ${result.author} added`, 'success')
    } catch (e) {
      setNotification(e.response.data.error, 'error')
    }
  }

  const setNotification = (message, type) => {
    console.log("hello", message, type)
    setMessage(message)
    setMessageType(type)

    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  if (!user) {
    return (
      <div>
        <Notification message={message} type={messageType} />
        <LoginForm setUser={setUser} setNotification={setNotification} />
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={message} type={messageType} />
      <DisplayForm user={user} blogs={blogs} logout={logout} />
      <CreateNewForm createNew={createBlog} />
    </div>
  )
}


const Notification = ({ message, type }) => {
  if (!message) {
    return null
  }

  const className = type === 'error' ? 'error' : 'success'
  return (
    <div className={className}>
      {message}
    </div>
  )
}
export default App