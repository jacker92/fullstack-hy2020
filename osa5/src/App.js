import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import userService from './services/users'
import LoginForm from './components/LoginForm'
import DisplayForm from './components/DisplayForm'
import CreateNewForm from './components/CreateNewForm'
import Togglable from './components/Togglable'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState()
  const [message, setMessage] = useState()
  const [messageType, setMessageType] = useState()

  const createFormRef = useRef()

  useEffect(() => {
    getTokenFromStorage()
    getBlogs()
  }, [])

  const getBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  const removeBlog = async (blog) => {
    if (!window.confirm(`Remove blog ${blog.title}`)) {
      return
    }

    try {
      await blogService.remove(blog)
      setBlogs(blogs.filter(x => x.id !== blog.id))
    }
    catch (e) {
      console.log(e)
      setNotification(e.response.data.error, 'error')
    }
  }

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

  const createBlog = async (event, blog) => {
    event.preventDefault()
    try {
      const result = await blogService.create(blog)
      setNotification(`A new blog ${result.title} by ${result.author} added`, 'success')
      createFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(result))
    } catch (e) {
      console.log(e)
      setNotification(e.response.data.error, 'error')
    }
  }

  const setLike = async (blog) => {
    blog.likes += 1
    await blogService.update(blog)
    setBlogs([...blogs])
  }

  const setNotification = (message, type) => {
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
        <LoginForm login={login} setNotification={setNotification} />
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={message} type={messageType} />
      <DisplayForm user={user} blogs={blogs} logout={logout} setLike={setLike} removeBlog={removeBlog} />
      <Togglable buttonLabel='Create new blog' ref={createFormRef}>
        <CreateNewForm createNew={createBlog} />
      </Togglable>
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