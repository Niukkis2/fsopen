import React from 'react'

const Persons = (props) => {
    if (props.matcher === '') {
      return (
        props.persons.map((p, i) => 
          <li key={i}>
          {p.name} {p.number}
          </li>)
      )
    }
    const filtered = props.persons.filter(p => p.name.toLowerCase().includes(props.matcher.toLowerCase())) 
    if (filtered.length === 0) {
      return (
        <div>No results</div>
      )
    } else {
      return (
        filtered.map((p, i) => 
        <li key={i}>
          {p.name} {p.number}
        </li>)
      )
    }
  }

export default Persons