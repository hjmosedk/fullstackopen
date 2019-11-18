import React from 'react';
import Singlecountry from './Singlecountry';
import ListCountry from './ListCountry';

const Countries = ({
	countries,
	search,
	showAllData,
	handleShowAlldata,
	filterSingle,
	weather,
	setWeather,
	setShowWeather,
	showWeather,
}) => {
	const filteredCountries = showAllData
		? countries.filter(country => country.name.includes(filterSingle))
		: countries.filter(country =>
				country.name.toLowerCase().includes(search)
		  );

	if (filteredCountries.length < 11 && filteredCountries.length > 1) {
		const countryRow = () =>
			filteredCountries.map(country => (
				<ListCountry
					key={country.name}
					country={country.name}
					countries={filteredCountries}
					showAllData={showAllData}
					handleShowAlldata={handleShowAlldata}
				/>
			));

		return <ul>{countryRow()}</ul>;
	}

	if (filteredCountries.length === 1) {
		return (
			<Singlecountry
				countries={filteredCountries}
				weather={weather}
				setWeather={setWeather}
				setShowWeather={setShowWeather}
				showWeather={showWeather}
			/>
		);
	}

	return <p>Too many matched, specify another filter, thank you</p>;
};

export default Countries;
