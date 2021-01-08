import React, { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import UserStatistics from './components/UserStatistics'
import NavigationMenu from './components/NavigationMenu'
import UserStatistic from './components/UserStatistic'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/credentialReducer'

import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const credential = useSelector(state => state.credential)

  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeBlogs())
  }, [dispatch])

  if (!credential.token) {
    return (
      <>
        <Notification />
        <div className="container">
          <LoginForm />
        </div>
      </>
    )
  }

  return (
    <Router>
      <NavigationMenu />
      <Notification />
      <div className="container" style={{paddingBottom: '50px'}}>
        <Switch>
          <Route path="/blogs/:id">
            <Blog />
          </Route>
          <Route path="/blogs">
            <Blogs />
          </Route>
          <Route path="/users/:id">
            <UserStatistic />
          </Route>
          <Route path="/users">
            <UserStatistics />
          </Route>
          <Route path="/">
            <Blogs />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App