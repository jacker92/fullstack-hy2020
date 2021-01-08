import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/credentialReducer'

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
      <form className="login" onSubmit={handleLogin}>
        <table>
          <tbody>
            <tr>
              <td>
                <p>Username:</p>
              </td>
              <td>
                <input type="text" name="username" onChange={({ target }) => setUsername(target.value)} />
              </td>
            </tr>
            <tr>
              <td>
                <p>Password:</p>
              </td>
              <td>
                <input type="password" name="password" onChange={({ target }) => setPassword(target.value)} />
              </td>
            </tr>
          </tbody>
        </table>
        <input id="login-button" type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default LoginForm