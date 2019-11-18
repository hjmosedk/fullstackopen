import React from 'react';

const PersonFrom = ({
	changeName,
	changeNumber,
	addPerson,
	newName,
	newNumber,
}) => {
	return (
		<div>
			<form onSubmit={addPerson}>
				<div>
					Name: <input value={newName} onChange={changeName} />
				</div>
				<div>
					Number:
					<input value={newNumber} onChange={changeNumber} />
				</div>
				<div>
					<button type='submit'>Add</button>
				</div>
			</form>
		</div>
	);
};
export default PersonFrom;
