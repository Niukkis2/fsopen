import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => {
  return (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
  )
}

const Stat = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Stats = (props) => {
  const {g, n, b} = props
  const all = g + n + b
  const avg = (g - b) / all
  const pos = g / all * 100
  if (all === 0) {
    return (
      <div>No feedback given</div>
    )
  }
  return (
  <div>
    <tbody>
      <Stat text={"good"} value={g}/>
      <Stat text={"neutral"} value={n}/>
      <Stat text={"bad"} value={b}/>
      <Stat text={"all"} value={all}/>
      <Stat text={"average"} value={avg}/>
      <Stat text={"positive"} value={`${pos} %`} />
    </tbody>
  </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button handleClick={() => setGood(good + 1)} text="good" />
        <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button handleClick={() => setBad(bad + 1)} text="bad" />
      </div>
      <h1>statistics</h1>
      <div><Stats g={good} n={neutral} b={bad}/></div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
