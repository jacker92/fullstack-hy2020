import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const content = [
    { "part": part1, "count": exercises1 },
    { "part": part2, "count": exercises2 },
    { "part": part3, "count": exercises3 },
  ]

  return (
    <div>
      <Header course={course} />
      <Content content={content} />
      <Total count={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

const Header = (props) => {
  return (
    <h1>
      {props.course}
    </h1>
  )
}

const Content = (props) => {
  return (
    <div>
      {props.content.map(x => <Part description={x.part} exerciseCount={x.count} />)}
    </div>
  )
}

const Part = (props) => {
  return (
    <p>{props.description} {props.exerciseCount}</p>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.count}</p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))