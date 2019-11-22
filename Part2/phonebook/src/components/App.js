import React, { useState, useEffect } from 'react';
import Filter from './Filter';
import PersonFrom from './PersonForm';
import Persons from './Persons';
import Notification from './Notification';
import personService from '../services/persons';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [search, setSearch] = useState('');
	const [notificationMessage, setNotificationMessage] = useState(null);
	const [messageStatus, setMessageStatus] = useState(true);

	useEffect(() => {
		personService.getAll().then(initialPersons => {
			setPersons(initialPersons);
		});
	}, []);

	const addPerson = event => {
		event.preventDefault();

		if (persons.some(person => person.name === newName)) {
			if (newNumber !== '') {
				if (
					window.confirm(
						`${newName} is already added to phonebook! - Do you want to update phonenumber?`
					)
				) {
					const pickedPerson = persons.find(p => p.name === newName);
					const updatedPerson = {
						...pickedPerson,
						number: newNumber,
					};
					personService
						.update(pickedPerson.id, updatedPerson)
						.then(newPhoneNumber =>
							setPersons(
								persons.map(person =>
									person.id !== pickedPerson.id
										? person
										: newPhoneNumber
								)
							)
						);
				}
			}
		} else {
			const personObject = {
				name: newName,
				number: newNumber,
			};
			personService
				.create(personObject)
				.then(newPersonList =>
					setPersons(persons.concat(newPersonList))
				)
				.catch(
					error => setNotificationMessage(error.response.data),
					setMessageStatus(!messageStatus),
					setTimeout(() => {
						setNotificationMessage(null);
					}, 5000),
					setMessageStatus(!messageStatus)
				);

			setNotificationMessage(`Added ${newName} to the phonebook`);
			setTimeout(() => {
				setNotificationMessage(null);
			}, 5000);
			setNewName(' ');
			setNewNumber(' ');
		}
	};

	const handleNewPerson = event => {
		setNewName(event.target.value);
	};

	const handleNewNumber = event => {
		setNewNumber(event.target.value);
	};

	const handleFilter = event => {
		setSearch(event.target.value.toLowerCase());
	};

	const handleRemoval = (id, name) => {
		if (window.confirm(`Do you really want to delete ${name}`)) {
			personService
				.remove(id)
				.then(setPersons(persons.filter(p => p.id !== id)))
				.catch(error => {
					setNotificationMessage(
						`Information of ${name} has already been removed form server`
					);
					setMessageStatus(!messageStatus);
					setTimeout(() => {
						setMessageStatus(!messageStatus);
						setNotificationMessage(null);
					}, 5000);
				});
		}
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification
				message={notificationMessage}
				messageStatus={messageStatus}
			/>
			<Filter onChange={handleFilter} />
			<h3>Add a New</h3>
			<PersonFrom
				changeName={handleNewPerson}
				changeNumber={handleNewNumber}
				addPerson={addPerson}
				newName={newName}
				newNumber={newNumber}
				persons={persons}
			/>
			<h3>Numbers</h3>
			<Persons
				persons={persons}
				search={search}
				handleRemoval={handleRemoval}
			/>
		</div>
	);
};

export default App;
