import React from 'react';

const Header = ({ courses }) => {
  return (
    <h2>{courses.name}</h2>
  )
}

const Total = ({ courses }) => {
  const sum = courses.parts.reduce((s, p) => s += p.exercises, 0)
  return(
    <h3>Total of {sum} exercises</h3>
  ) 
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>    
  )
}

const Content = ({ courses }) => {
  return (
    <div>
      {courses.parts.map((parts, i) => <Part key={i} part={parts}/>)}
    </div>
  )
}

const Combined = ({courses}) => {
    return (
      <div>
        <Header courses={courses} />
        <Content courses={courses} />
        <Total courses={courses} />
      </div>
    )
}

const Course = ({ courses }) => {
  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map((courses, i) => <Combined key={i} courses={courses}/>)}
    </div>
  )
}

export default Course