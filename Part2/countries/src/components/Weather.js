import React from 'react';

const Weather = ({ weather }) => {
	return (
		<div>
			<h2>Weather in {weather.location.name}</h2>
			<p>
				<strong>Temperature: </strong>
				{weather.current.temperature}℃
			</p>
			<div>
				<img
					src={weather.current.weather_icons}
					alt='Current weather in the capital'
				></img>
				<p>
					<strong>Wind: </strong>
					{weather.current.wind_speed} m/s direction:{' '}
					{weather.current.wind_dir}
				</p>
			</div>
		</div>
	);
};

export default Weather;
