import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course} />
      <Total parts={course} />
    </div>
  )
}

const Header = ({course}) => {
  return (
    <h1>
      {course.name}
    </h1>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.parts.map(x => <Part description={x.name} exerciseCount={x.exercises} />)}
    </div>
  )
}

const Part = ({description, exerciseCount}) => {
  return (
    <p>{description} {exerciseCount}</p>
  )
}

const Total = ({parts}) => {
  const sum = parts.parts.reduce((a, b) => a + (b.exercises || 0), 0);
  return (
    <div>
      <p>Number of exercises {sum}
      </p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))