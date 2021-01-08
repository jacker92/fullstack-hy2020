import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/credentialReducer'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault()
    dispatch(login(username, password))
  }
  return (
    <div>
      <h2>Log in to application</h2>
      <Form className="login" onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control onChange={(e) => setUsername(e.target.value)} type="text" name="username" />
          <Form.Label>Password:</Form.Label>
          <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" name="password" />
        </Form.Group>
        <Button variant="primary" type="submit">Login</Button>
      </Form>
    </div>
  )
}

export default LoginForm