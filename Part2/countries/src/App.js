import React, { useState, useEffect } from 'react';
import Countries from './components/Countries';
import axios from 'axios';

const App = () => {
	const [countries, setCountries] = useState([]);
	const [search, setSearch] = useState('Input text');
	const [showAllData, setShowAllData] = useState(false);
	const [filterSingle, setFilterSingle] = useState();
	const [weather, setWeather] = useState([]);
	const [showWeather, setShowWeather] = useState(false);

	const severData = () => {
		axios.get('https://restcountries.eu/rest/v2/all').then(response => {
			setCountries(response.data);
		});
	};

	useEffect(severData, []);

	const handleSearch = event => {
		setSearch(event.target.value.toLowerCase());
		setShowAllData(false);
		setShowWeather(false);
	};

	const handleShowAlldata = value => {
		setShowAllData(!showAllData);
		setFilterSingle(value.country);
	};

	return (
		<div>
			<p>
				Find the country you want to learn about:
				<input onChange={handleSearch}></input>
			</p>
			<Countries
				countries={countries}
				search={search}
				showAllData={showAllData}
				handleShowAlldata={handleShowAlldata}
				filterSingle={filterSingle}
				weather={weather}
				setWeather={setWeather}
				showWeather={showWeather}
				setShowWeather={setShowWeather}
			/>
		</div>
	);
};

export default App;
