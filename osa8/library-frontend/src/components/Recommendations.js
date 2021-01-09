import React from 'react'
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from './../queries'

const Recommendations = ({ show, user }) => {

    const result = useQuery(ALL_BOOKS, {
        variables: { genre: user ? user.favoriteGenre : null }
    })

    if (!user || !show) {
        return null
    }

    const books = result.data.allBooks

    return (
        <div>
            <h3>Recommendations</h3>
            <p>Books in your favorite genre <b>{user.favoriteGenre}</b></p>
            {books.map(book => (
                <p key={book.title}>{book.title} | {book.author.name} | {book.published}</p>
            ))}
        </div>
    )
}

export default Recommendations