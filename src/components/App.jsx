import '../styles/App.scss';
import { useEffect, useState } from 'react';

// Fichero src/components/App.jsx

function App () {

  const [countriesList, setCountriesList] = useState([]);
  const [countryNameFilter, setCountryNameFilter] = useState('');
  const [countrySelect, setCountrySelect] = useState('All');


  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,capital,flag,continents")
    .then((response) => response.json())
    .then((data) => {
      setCountriesList(data);
    }, []);
  })
  
  const renderCountriesList = ()=>{
    return countriesList.filter((eachCountry) =>{
    const matchesNameCountry = eachCountry.name.official.toLowerCase().includes(countryNameFilter.toLowerCase());
    const matchesContinent = countrySelect === 'All' || eachCountry.continents[0] === countrySelect;
    return matchesNameCountry && matchesContinent;
    })
    .map((eachCountry, i)=>{
    return <li className='country__card' key={i}>
    <p className='country__flag'>{eachCountry.flag}</p>
    <h2 className='country__name'>{eachCountry.name.official}</h2>
    <p className='country__capital'>{eachCountry.capital}</p>
    <p className='country__continent'>{eachCountry.continents[0]}</p>
    </li>
  })
  }

  const handleNameFilter = (ev) => {
    setCountryNameFilter(ev.target.value);
    console.log('soy el evento del filtrado por nombre');
  }

  const handelContinentSelect = (ev) => {
    setCountrySelect(ev.target.value);
    console.log('soy el evento del select');
  }


  return (
    <div className='app'>
      <header className='header'>
        <h1>Country Info App</h1>
        <p>Explore information about contries and flags. Add new countries and filter throught the list!</p>
      </header>
      <main className='main'>
        <section className='filters__container'>
        <h2>Filters</h2>
        <form className='filters__form'>
        <label htmlFor="country">By Country:</label>
        <input 
          type="text" 
          id="country" 
          name="country"
          value={countryNameFilter}
          onChange={handleNameFilter}/>
        <label htmlFor="continent">By Continent:</label>
        <select 
          id="continent" 
          name="continent"
          value={countrySelect}
          onChange={handelContinentSelect}>
            <option value="All">All</option>
            <option value="Africa">Africa</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="North-america">North America</option>
            <option value="Oceania">Oceania</option>
            <option value="South-america">South America</option>
        </select>
        </form>
        </section>
        <section className='countries__section'>
          <ul className='countries__list'>
            {renderCountriesList()}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;