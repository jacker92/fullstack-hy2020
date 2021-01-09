import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { useApolloClient, useQuery } from '@apollo/client';
import { ME } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('library-user-token'))
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const me = useQuery(ME)

  useEffect(() => {
    if (token) {
      setPage('authors')

    }
  }, [token]) // eslint-disable-line

  useEffect(() => {
    if (me.loading || !me.data.me) {
      return
    }
    setUser(me.data.me)
  }, [me])

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ?
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommendations')}>recommendations</button>
            <button onClick={logout}>Logout</button>
          </>
          :
          <button onClick={() => setPage('login')}>login</button>
        }

      </div>
      <Authors
        show={page === 'authors'}
        loggedIn={token}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Recommendations
        show={page === 'recommendations'}
        user={user}
      />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
      />
    </div>
  )
}

export default App