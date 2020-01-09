const initalState = { message: null, type: 'info' };

const notificationReducer = (state = initalState, action) => {
  switch (action.type) {
    case 'NEW_INFO':
      return { ...state, message: action.data.message, type: action.data.type };
    case 'RESET':
      return { ...state, message: null };
    default:
      return state;
  }
};
export const setNotification = (info, type, time) => {
  return dispatch => {
    dispatch({ type: 'NEW_INFO', data: { message: info, type: type } });
    setTimeout(() => dispatch(resetNotification()), time * 1000);
  };
};

export const resetNotification = () => {
  return { type: 'RESET' };
};

export default notificationReducer;
