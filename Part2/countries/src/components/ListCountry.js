import React from 'react';

const ListCountry = ({ country, handleShowAlldata }) => {
	return (
		<p>
			{country}{' '}
			<button onClick={() => handleShowAlldata({ country })}>
				Show All Info
			</button>
		</p>
	);
};

export default ListCountry;
