import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Languages = (props) => {
  return (
    <div>
      <h3>languages</h3>
      <ul>
        {props.lang.map((l, i) => <li key={i}>{l.name}</li>)}
      </ul>
    </div>
  )
}

const Weather = (props) => {
  return (
    <div>
      <h3>Weather in {props.weatherData.name}</h3>
        <div><strong>temperature:</strong> {props.weatherData.main.temp} Celsius</div>
        <img src={`http://openweathermap.org/img/wn/${props.weatherData.weather[0].icon}@2x.png`} 
            alt='Could not load weather icon'
            width='100'
            height='100'></img>
        <div>wind: {props.weatherData.wind.speed} kmh direction {props.weatherData.wind.deg} degrees</div>
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
      <img src={props.data.flag} 
           alt="Could not load flag" 
           width="200" 
           height="150"></img>
      <Weather weatherData={props.weather}/>
    </div>
  )
}

const CountryListing = (props) => {

  const filtered = props.countries.filter(c => c.name.toLowerCase().includes(props.matcher.toLowerCase()))
  if (props.show) {
    return (
      <div>
        <SingleCountry data={props.countryToShow} weather={props.weather} />
      </div>
    )
  }
  if (filtered.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  } else if (filtered.length <= 10 && filtered.length >= 2){
    return (
      filtered.map(c => 
      <li key={c.numericCode}>{c.name}<button onClick={() => {props.setShow(true); props.setCountryToShow(c)}}>show</button></li>)
    )
  } else if (filtered.length === 1) {
    props.setCountryToShow(filtered[0])
    return (
      <SingleCountry data={props.countryToShow} weather={props.weather} />
    )
  } else {
    return (
      <div>No results</div>
    )
  }
}

const App = () => {
  const [matcher, setMatcher] = useState('')
  const [countries, setCountries] = useState([])
  const [resolved, setResolved] = useState(false)
  const [show, setShow] = useState(false)
  const [countryToShow, setCountryToShow] = useState([])
  const [weather, setWeather] = useState([])
  const [weatherResolved, setWeatherResolved] = useState(false)

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
        setCountryToShow(response.data[0])
      })
      setResolved(true)
  }, []);

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${countryToShow.capital}&appid=${api_key}&units=metric`)
      .then(response => setWeather(response.data))
      setWeatherResolved(true)
  }, [countryToShow]);

  const handleMatcherChange = (event) => {
    setShow(false)
    setMatcher(event.target.value)
  }
  if (!resolved && !weatherResolved) {
    return <div>Fetching country data...</div>
  }
  return (
    <div>
      <form>find countries: <input value={matcher} onChange={handleMatcherChange}></input></form>
      <CountryListing countries={countries}
                      matcher={matcher} 
                      setCountryToShow={setCountryToShow}
                      countryToShow={countryToShow}
                      setShow={setShow}
                      show={show}
                      weather={weather} />
    </div>
  )
}

export default App
