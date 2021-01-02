import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = ({ anecdotes }) => {

  const generateRandomIndex = () => {
    return Math.floor(Math.random() * anecdotes.length)
  }

  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));
  const [selected, setSelected] = useState(generateRandomIndex());

  const getMostVotedAnecdoteIndex = () => {
    console.log(points);
    let index = points.indexOf(Math.max(...points));
    return index;
  }

  const addVote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy);
  }

  return (
    <div>
      <Anecdote content={anecdotes[selected]} />
      <button onClick={() => setSelected(generateRandomIndex())}>Next anecdote</button>
      <button onClick={() => addVote()}>Vote</button>
      <MostVotedAnekdote
        anecdote={anecdotes[getMostVotedAnecdoteIndex()]}
        voteCount={points[getMostVotedAnecdoteIndex()]}
      />
    </div>
  )
}

const Anecdote = ({ content }) => {
  return (
    <>
      <p>{content}</p>
    </>
  )
}

const MostVotedAnekdote = ({ anecdote, voteCount }) => {
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{anecdote}</p>
      <p>has {voteCount} votes</p>
    </div>
  )
}
const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)