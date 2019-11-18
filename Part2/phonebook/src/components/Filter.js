import React from 'react';

const Filter = ({ onChange }) => {
	return (
		<div>
			Filter shown with:
			<input onChange={onChange}></input>
		</div>
	);
};

export default Filter;
