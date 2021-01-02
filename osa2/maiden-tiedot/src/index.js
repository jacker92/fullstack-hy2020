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

  const getData = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(getData, []);

  return (
    <div>
      <SearchArea onChange={onSearchTermChange} />
      <SearchResultsDisplay countries={countries} searchTerm={searchTerm} />
    </div>
  )
}

const SearchResultsDisplay = ({ countries, searchTerm }) => {
  let filteredCountries = countries.filter
    (x => x.name.toUpperCase().indexOf(searchTerm.toUpperCase()) !== -1);

  if (filteredCountries.length === 1) {
    return (
      <Country country={filteredCountries[0]} />
    )
  }
  else if (filteredCountries.length > 0 && filteredCountries.length <= 10) {
    return (
      <div>
        {filteredCountries.map(x => <p>{x.name}</p>)}
      </div>
    )
  }
  return (
    <div></div>
  )
}

const Country = ({ country }) => {
  console.log(country);
  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>Languages</h3>

      <ul>
      {country.languages.map(x => <li>{x.name}</li>)}
      </ul>
      <img src={country.flag}/>
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