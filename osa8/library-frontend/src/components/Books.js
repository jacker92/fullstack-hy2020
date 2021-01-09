import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES } from './../queries'
import GenreFilter from './GenreFilter'
const Books = (props) => {
  const [filter, setFilter] = useState(null)

  const result = useQuery(ALL_BOOKS, {
    variables: {genre: filter}
  })

  const genreResult = useQuery(ALL_GENRES)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  const genres = genreResult.data.allGenres

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th>
              book name
            </th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <GenreFilter genres={genres} setFilter={setFilter} />
    </div>
  )
}

export default Books