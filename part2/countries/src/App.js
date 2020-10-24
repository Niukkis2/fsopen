import './App.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Languages = (props) => {
  return (
    <div>
      <h2>languages</h2>
      <ul>
        {props.lang.map((l, i) => <li key={i}>{l.name}</li>)}
      </ul>
    </div>
  )
}

const SingleCountry = (props) => {
  return (
    <div>
      <h2>{props.data.name}</h2>
      <li>capital {props.data.capital}</li>
      <li>population {props.data.population}</li>
      <Languages lang={props.data.languages}/>
      <img src={props.data.flag} alt="Could not load flag" width="200" height="150"></img>
    </div>
  )
}

const CountryListing = (props) => {
  const filtered = props.countries.filter(c => 
    c.name
    .toLowerCase()
    .includes(props.matcher.toLowerCase()))
  if (filtered.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  } else if (filtered.length <= 10 && filtered.length >= 2){
    return (
      filtered.map(c => <li key={c.numericCode}>{c.name}</li>)
    )
  } else {
    return (
      <SingleCountry data={filtered[0]}/>
    )
  }
}

const App = (props) => {
  const [matcher, setMatcher] = useState('')
  const [countries, setCountries] = useState([])

  const handleMatcherChange = (event) => {
    setMatcher(event.target.value)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <form>find countries: <input value={matcher} onChange={handleMatcherChange}></input></form>
      <CountryListing matcher={matcher} countries={countries}/>
    </div>
  )
}

export default App;
