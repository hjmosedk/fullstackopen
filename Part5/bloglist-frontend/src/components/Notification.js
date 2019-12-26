import React from 'react';

const Notification = ({ notification }) => {
  const style = {
    color: notification.type === 'error' ? 'red' : 'green',
    background: 'darkblue',
    fontSize: 35,
    borderStyle: 'solid',
    borderRadius: '50%',
    padding: 15,
    margin: 15,
  };

  if (notification.message === null) {
    return null;
  }

  return <div style={style}>{notification.message}</div>;
};

export default Notification;
