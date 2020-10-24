import React from 'react'

const Filter = (props) => {
    return (
      <form >
        <div>filter shown with <input value={props.matcher} onChange={props.onMatcherChange}/></div>
      </form>
    )
  }

export default Filter