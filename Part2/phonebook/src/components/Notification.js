import React from 'react';

const Notification = ({ message, messageStatus }) => {
	if (message === null) {
		return null;
	}

	if (messageStatus === true) {
		return <div className='notficiation'>{message}</div>;
	}

	return <div className='error'>{message}</div>;
};

export default Notification;
