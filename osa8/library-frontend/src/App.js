import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { useApolloClient, useQuery, useMutation, useSubscription, } from '@apollo/client';
import { ME, BOOK_ADDED, ALL_BOOKS } from './queries'

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

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData)
      const addedBook = subscriptionData.data.bookAdded
      console.log(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })

  const updateCacheWith = (addedBook) => {

    const includedIn = (set, object) =>
      set.map(p => p.title).includes(object.title)

    const dataInStore = client.readQuery({
      query: ALL_BOOKS,
      variables: { genre: null }
    })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
        variables: {
          genre: null
        }
      })
    }
  }

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
        updateCacheWith={updateCacheWith}
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