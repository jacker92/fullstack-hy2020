import React, { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import DisplayForm from './components/DisplayForm'
import CreateNewForm from './components/CreateNewForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import UserStatistics from './components/UserStatistics'
import UserStatistic from './components/UserStatistic'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/credentialReducer'

import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const credential = useSelector(state => state.credential)
  const users = useSelector(state => state.users)

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
    <Router>
      <NavigationMenu/>
      <Notification />
      <DisplayForm />
      <Switch>
        <Route path="/blogs">
          <Blogs/>
        </Route>
        <Route path="/users/:id">
          <UserStatistic users={users} />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <Blogs />
        </Route>
      </Switch>
    </Router>
  )
}

const Users = () => {
  return(
    <UserStatistics />
  )
}
const Blogs = () => {
  return(
    <div>
      <h2>Blogs</h2>
      <Togglable buttonLabel='Create new blog'>
        <CreateNewForm />
      </Togglable>
    </div>
  )
}

const NavigationMenu = () => {
  const padding = {
    padding: 5
  }
  return(
    <div>
      <Link  to="/">home</Link>
      <Link style={padding} to="/blogs">Blogs</Link>
      <Link style={padding} to="/users">Users</Link>
    </div>
  )
}

export default App