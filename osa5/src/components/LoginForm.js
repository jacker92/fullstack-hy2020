import React, { useState } from 'react'
import loginService from '../services/login'
import PropTypes from 'prop-types'

const LoginForm = ({ login, setNotification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const token = await loginService.login(username, password)
      login(token)
      window.localStorage.setItem('token', JSON.stringify(token))
    } catch (e) {
      setNotification(e.response.data.error, 'error')
    }
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

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired
}

export default LoginForm