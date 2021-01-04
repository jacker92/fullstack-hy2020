import React, { useState } from 'react'
import loginService from '../services/login'

const LoginForm = ({ setUser }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault();
        const token = await loginService.login(username, password)
        setUser(token)
        window.localStorage.setItem('token', JSON.stringify(token))
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
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default LoginForm