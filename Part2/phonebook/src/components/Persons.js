import React from 'react';
import ListPersons from './ListPersons';

const Persons = ({ persons, search, handleRemoval }) => {
	const row = () =>
		persons
			.filter(person => person.name.toLowerCase().includes(search))
			.map(person => (
				<ListPersons
					key={person.id}
					person={person}
					handleRemoval={() => handleRemoval(person.id, person.name)}
				/>
			));
	return <ul>{row()}</ul>;
};

export default Persons;
