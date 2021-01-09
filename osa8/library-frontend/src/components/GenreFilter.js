import React from 'react'

const GenreFilter = ({ genres, setFilter }) => {
    return (
      <div>
        {genres
        .map(genre => 
        <button key={genre} onClick={() => setFilter(genre)}>{genre}</button>
        )}
        <button onClick={(e) => setFilter(null)}>all genres</button>
      </div>
    )
  }

  export default GenreFilter