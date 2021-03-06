import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState([]);

  const onSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  }

  const getCountryData = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(getCountryData, []);

  return (
    <div>
      <SearchArea onChange={onSearchTermChange} />
      <SearchResultsDisplay countries={countries} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </div>
  )
}

const SearchResultsDisplay = ({ countries, searchTerm, setSearchTerm }) => {
  const filteredCountries = countries.filter
    (x => x.name.toUpperCase().indexOf(searchTerm.toUpperCase()) !== -1);

  if (filteredCountries.length === 1) {
    return (
      <Country key={filteredCountries[0].name} country={filteredCountries[0]} />
    )
  }
  else if (filteredCountries.length > 0 && filteredCountries.length <= 10) {
    return (
      <div>
        {filteredCountries.map(x => (
          <MinimizedCountry key={x.name} country={x} setSearchTerm={setSearchTerm} />
        ))}
      </div>
    )
  }
  return (
    <div></div>
  )
}

const MinimizedCountry = ({ country, setSearchTerm }) => {
  return (
    <div>
      <p>{country.name}</p>
      <button onClick={() => setSearchTerm(country.name)}>show</button>
    </div>
  )
}

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {country.languages.map(x => <li key={x.name}>{x.name}</li>)}
      </ul>
      <img src={country.flag} />
      <WeatherData country={country} />
    </div>
  )
}

const WeatherData = ({ country }) => {

  const [currentWeather, setCurrentWeather] = useState();

  const getWeatherData = () => {
    if (currentWeather) {
      return;
    }
    const url = 'http://api.weatherstack.com/current?access_key=' + process.env.REACT_APP_API_KEY + '&query=' + country.capital;
    axios
      .get(url)
      .then(response => {
        console.log(response.data);
        setCurrentWeather(response.data)
      })
  }
  useEffect(getWeatherData, [])

  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <p>Temperature: {currentWeather?.current?.temperature} celcius</p>
      <p>Wind: {currentWeather?.current?.wind_speed} mph direction {currentWeather?.current?.wind_dir}</p>
    </div>
  )
}

const SearchArea = ({ onChange }) => {
  return (
    <div>
      <label>Find countries</label>
      <input type="text" onChange={onChange} />
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);