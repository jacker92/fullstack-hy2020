import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from './../queries'

const LoginForm = ({ setToken, show }) => {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            console.log(error.graphQLErrors[0].message)
        }
    })

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('library-user-token', token)
        }
    }, [result.data]) // eslint-disable-line


    const onSubmit = (e) => {
        e.preventDefault();
        login({ variables: { username, password } })
    }

    if (!show) {
        return null
      }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={onSubmit}>
                username:<input type="text" onChange={(e) => setUserName(e.target.value)}></input><br />
                password:<input type="password" onChange={(e) => setPassword(e.target.value)}></input><br />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginForm