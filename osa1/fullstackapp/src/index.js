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

const Header = (props) => {
  return (
    <h1>
      {props.course.name}
    </h1>
  )
}

const Content = (props) => {
  console.log(props);
  return (
    <div>
      {props.parts.parts.map(x => <Part description={x.name} exerciseCount={x.exercises} />)}
    </div>
  )
}

const Part = (props) => {
  return (
    <p>{props.description} {props.exerciseCount}</p>
  )
}

const Total = (props) => {
  const sum = props.parts.parts.reduce((a, b) => a + (b.exercises || 0), 0);
  return (
    <div>
      <p>Number of exercises {sum}
      </p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))