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
      <Statistics
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
      <Button name="good" onClick={setGood} />
      <Button name="neutral" onClick={setNeutral} />
      <Button name="bad" onClick={setBad} />
    </div>
  )
}

const Button = ({ name, onClick }) => {
  return (
    <div className="responseButton">
      <button onClick={onClick}>{name}</button>
    </div>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  let total = good + neutral + bad;
  let average = (good - bad) / total || 0
  let positiveValues = 100 * ((total - (neutral + bad)) / total) || 0;

  if (total > 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <table>
          <tbody>
            <StatisticLine text="Good" value={good} />
            <StatisticLine text="Neutral" value={neutral} />
            <StatisticLine text="Bad" value={bad} />
            <StatisticLine text="All" value={total} />
            <StatisticLine text="Average" value={average} />
            <StatisticLine text="Positive" value={positiveValues} />
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div>
      <h1>Statistics</h1>
      <p>No feedback given.</p>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)