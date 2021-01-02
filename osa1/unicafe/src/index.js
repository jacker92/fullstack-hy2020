import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css';

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <GiveFeedback
        setGood={() => setGood(good + 1)}
        setNeutral={() => setNeutral(neutral + 1)}
        setBad={() => setBad(bad + 1)}
      />
      <FeedbackStatistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

const GiveFeedback = ({ setGood, setNeutral, setBad }) => {
  return (
    <div>
      <h1>Give feedback</h1>
      <ResponseButton name="good" onClick={setGood} />
      <ResponseButton name="neutral" onClick={setNeutral} />
      <ResponseButton name="bad" onClick={setBad} />
    </div>
  )
}

const ResponseButton = ({ name, onClick }) => {
  return (
    <div className="responseButton">
      <button onClick={onClick}>{name}</button>
    </div>
  )
}

const FeedbackStatistics = ({ good, neutral, bad }) => {
  let total = good + neutral + bad;
  let average = (good-bad)/total || 0
  let positiveValues = 100 *((total-(neutral+bad))/total) || 0;

  return (
    <div>
      <h1>Statistics</h1>
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
      <p>All {total}</p>
      <p>Average {average}</p>
      <p>Positive {positiveValues}%</p>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)