import anecdoteService from '../services/anecdotes';

export const createdAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({ type: 'NEW_ANECDOTE', data: newAnecdote });
  };
};

export const votedAnecdote = anecdote => {
  const newVote = anecdote.votes + 1;
  const newAnecdote = { ...anecdote, votes: newVote };
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updatedAnecdote(newAnecdote);
    dispatch({ type: 'VOTE', data: updatedAnecdote });
  };
};

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({ type: 'INIT_ANECDOTE', data: anecdotes });
  };
};

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const findAnecdotesoChange = action.data;
      console.log(action.data);
      return state.map(a => {
        return a.id === findAnecdotesoChange.id ? findAnecdotesoChange : a;
      });
    case 'NEW_ANECDOTE':
      return [...state, action.data];
    case 'INIT_ANECDOTE':
      return action.data;
    default:
      return state;
  }
};

export default anecdoteReducer;
