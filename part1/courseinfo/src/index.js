import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return (
    <h1>
      {props.course}
    </h1>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.exercise}
      </p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.p1} exercise={props.e1}/>
      <Part part={props.p2} exercise={props.e2}/>
      <Part part={props.p3} exercise={props.e3}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>
        Number of exercises {props.e1 + props.e2 + props.e3}
      </p>
  </div>
  )
}
const App = () => {
  const course = {
    name: "Half Stack application development",
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
      <Header course={course.name} />
      <Content p1={course.parts[0].name} e1={course.parts[0].exercises}
               p2={course.parts[1].name} e2={course.parts[1].exercises}
               p3={course.parts[2].name} e3={course.parts[2].exercises} />
      <Total e1={course.parts[0].exercises}
             e2={course.parts[1].exercises} 
             e3={course.parts[2].exercises} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
