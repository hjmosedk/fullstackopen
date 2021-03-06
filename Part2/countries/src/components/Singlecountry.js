import React, { useEffect } from 'react';
import axios from 'axios';
import Weather from './Weather';
import LoadingInfo from './LoadingInfo';
import Language from './Language';

const api_key = process.env.REACT_APP_API_KEY;
const imgstyle = {
	height: '280px',
	width: '370px',
};

const Singlecountry = ({
	countries,
	weather,
	setWeather,
	showWeather,
	setShowWeather,
}) => {
	const listOflanguange = () =>
		countries[0].languages.map(l => (
			<Language key={l.name} language={l.name} />
		));

	const weatherData = () => {
		axios
			.get(
				`http://api.weatherstack.com/current?access_key=${api_key}&query=${countries[0].capital}&units=m` //For securtity reason the API key have been removed.
			)
			.then(response => {
				setWeather(response.data);
				setShowWeather(!showWeather);
			})
			.catch(error => {
				console.log(error);
			});
	};

	useEffect(weatherData, []);

	return (
		<div>
			<h1>{countries[0].name}</h1>
			<p>Capital: {countries[0].capital}</p>
			<p>Population: {countries[0].population}</p>
			<h2>Languages:</h2>
			<ul>{listOflanguange()}</ul>
			<div>
				<img
					src={countries[0].flag}
					alt='The flag of the nation shown'
					style={imgstyle}
				></img>
			</div>
			<div>
				{showWeather === true ? (
					<Weather weather={weather} />
				) : (
					<LoadingInfo />
				)}
			</div>
		</div>
	);
};

export default Singlecountry;
