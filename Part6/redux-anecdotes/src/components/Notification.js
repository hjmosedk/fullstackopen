import React from 'react';
import { connect } from 'react-redux';

const Notification = props => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };
  return <div style={style}>{props.info.message}</div>;
};

const mapStateToProps = state => {
  return { info: state.info };
};

export default connect(mapStateToProps, null)(Notification);
