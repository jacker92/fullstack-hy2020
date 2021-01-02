const Course = ({ course }) => {
    return (
      <div>
        <Header course={course} />
        <Content parts={course} />
        <Total parts={course} />
      </div>
    )
  }
  
  const Header = ({ course }) => {
    return (
      <h1>
        {course.name}
      </h1>
    )
  }
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.parts.map(x => <Part key={x.id} description={x.name} exerciseCount={x.exercises} />)}
      </div>
    )
  }
  
  const Part = ({ description, exerciseCount }) => {
    return (
      <p>{description} {exerciseCount}</p>
    )
  }
  
  const Total = ({ parts }) => {
    const sum = parts.parts.reduce((a, b) => a + (b.exercises || 0), 0);
    return (
      <div>
        <p><b>Total number of exercises: {sum}</b>
        </p>
      </div>
    )
  }

  export default Course;