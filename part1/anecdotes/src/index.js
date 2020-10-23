import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Anecdote = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <div>{props.mostVoted}</div>
      <div>has {props.maxVotes} votes</div>
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(Math.floor(Math.random() * 6))
  const [points, setPoints] = useState(Array.apply(null, Array(6)).map(Number.prototype.valueOf,0))

  const getMaxVotes = () => {
    let maxVotes= 0, maxIndex = 0
    for (const [i, value] of points.entries()) {
      if (value > maxVotes) {
        maxVotes = value
        maxIndex = i
      }
    }
    return [maxVotes, maxIndex]
  }

  const updatePoints = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  return (
    <div>
      <Anecdote title={"Anecdote of the day"}
                maxVotes={points[selected]}
                mostVoted={props.anecdotes[selected]}/>
      <Button text={"vote"} handleClick={() => updatePoints()} />
      <Button text={"next anecdote"} handleClick={() => setSelected(Math.floor(Math.random() * 6))}/>
      <Anecdote title={"Anecdote with the most votes"}
                maxVotes={getMaxVotes()[0]}
                mostVoted={props.anecdotes[getMaxVotes()[1]]} />
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
