import React from 'react';
import { createdAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';
import { connect } from 'react-redux';

const AnecdoteForm = props => {
  const addNewAnecdote = async event => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = '';
    props.createdAnecdote(anecdote);
    props.setNotification(`You have added "${anecdote}" to the list`, 10);
  };

  return (
    <div>
      <h2>Create</h2>
      <form onSubmit={addNewAnecdote}>
        <div>
          <input name='anecdote' />
        </div>
        <button type='submit'>Create</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  createdAnecdote,
  setNotification,
};
export default connect(null, mapDispatchToProps)(AnecdoteForm);
