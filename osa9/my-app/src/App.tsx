import './App.css';
import React from "react";
import { Total } from './Total';
import { Content } from './Content';
import { Header } from './Header';

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const calculateSum = (): number => {
    return courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)
  }

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total sum={calculateSum()} />
    </div>
  )
};

export default App;
