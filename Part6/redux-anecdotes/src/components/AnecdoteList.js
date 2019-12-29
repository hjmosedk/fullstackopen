import React from 'react';
import { votedAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';
import { connect } from 'react-redux';

const AnecdoteList = props => {
  const vote = anecdote => {
    props.votedAnecdote(anecdote);
    props.setNotification(`You have voted for "${anecdote.content}"`, 10);
  };

  return (
    <div>
      {props.visibleAnecdotes.map(anecdote => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => vote(anecdote)}
        />
      ))}
    </div>
  );
};

const anecdotesToShow = ({ anecdotes, filter }) => {
  return anecdotes
    .filter(a => a.content.toLowerCase().includes(filter.filterValue))
    .sort((a, b) => b.votes - a.votes);
};

const Anecdote = ({ handleClick, anecdote }) => {
  return (
    <div>
      {anecdote.content}
      <div>
        has {anecdote.votes} <button onClick={handleClick}>Vote</button>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    visibleAnecdotes: anecdotesToShow(state),
  };
};

const mapDispatchToProps = {
  votedAnecdote,
  setNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
