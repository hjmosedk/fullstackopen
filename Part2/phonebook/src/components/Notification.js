import React from 'react';

const Notification = ({ message, messageStatus }) => {
	const notificationStyle = {
		color: messageStatus === 'error' ? 'red' : 'green',
		background: 'lightgrey',
		fontSize: '20px',
		borderStyle: 'solid',
		borderRadius: '15px',
		padding: '15px',
		marginBottom: '25px',
	};

	if (message === null) {
		return null;
	}

	return <div style={notificationStyle}>{message}</div>;
};

export default Notification;
