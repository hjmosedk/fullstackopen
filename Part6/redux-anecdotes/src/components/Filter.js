import React from 'react';
import { newFilter } from '../reducers/filterReducer';
import { connect } from 'react-redux';

const Filter = props => {
  const style = { marginBottom: 10 };

  const handleChange = event => {
    const filter = event.target.value.toLowerCase();
    props.newFilter(filter);
  };

  return (
    <div style={style}>
      Filter <input onChange={handleChange} />
    </div>
  );
};

const mapDispatchToProps = {
  newFilter,
};
export default connect(null, mapDispatchToProps)(Filter);
