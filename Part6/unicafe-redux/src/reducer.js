const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOOD':
      const updatedGood = state.good + 1;
      return (state = { ...state, good: updatedGood });
    case 'OK':
      const updatedOk = state.ok + 1;
      return (state = { ...state, ok: updatedOk });
    case 'BAD':
      const updatedBad = state.bad + 1;
      return (state = { ...state, bad: updatedBad });
    case 'ZERO':
      return initialState;
    default:
      return state;
  }
};

export default counterReducer;
