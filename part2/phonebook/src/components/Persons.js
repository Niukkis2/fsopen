import React from 'react'

const Persons = (props) => {
  if (props.matcher === '') {
    return (
      props.persons.map(p => 
        <li className='person' key={p.id}>
        {p.name} {p.number} 
        <button onClick={() => props.onClick(p.name, p.id)} key={p.id}>delete</button>
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
      filtered.map(p => 
      <li className='person' key={p.id}>
        {p.name} {p.number}
      </li>)
    )
  }
}

export default Persons