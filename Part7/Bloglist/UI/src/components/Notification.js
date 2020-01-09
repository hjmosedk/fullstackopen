import React from 'react';
import { connect } from 'react-redux';
import { Message } from 'semantic-ui-react';

const Notification = props => {
  if (props.notification.message === null) {
    return null;
  }

  return (
    <div>
      {props.notification.type === 'error' ? (
        <Message data-cy='error' error>
          {props.notification.message}
        </Message>
      ) : (
        <Message data-cy='info' success>
          {props.notification.message}
        </Message>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return { notification: state.notification };
};

export default connect(mapStateToProps, null)(Notification);
