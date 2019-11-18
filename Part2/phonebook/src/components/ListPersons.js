import React from 'react';

const ListPersons = ({ person, handleRemoval }) => {
	return (
		<li>
			{person.name} {person.number}{' '}
			<button onClick={handleRemoval}>Delete Entry</button>
		</li>
	);
};

export default ListPersons;
