import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/credentialReducer'

const NavigationMenu = () => {
  const credential = useSelector(state => state.credential)
  const dispatch = useDispatch()

  const padding = {
    padding: 5
  }

  return (
    <div>
      <Link to="/">home</Link>
      <Link style={padding} to="/blogs">Blogs</Link>
      <Link style={padding} to="/users">Users</Link>
      <b>{credential.username}</b> has logged in
      <button onClick={() => dispatch(logout())}>Logout</button>
    </div>
  )
}

export default NavigationMenu