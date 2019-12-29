const initalState = { message: '' };

const notificationReducer = (state = initalState, action) => {
  switch (action.type) {
    case 'NEW_INFO':
      return { ...state, message: action.data.message };
    case 'RESET':
      return { ...state, message: ' ' };
    default:
      return state;
  }
};
export const setNotification = (info, time) => {
  return dispatch => {
    dispatch({ type: 'NEW_INFO', data: { message: info } });
    setTimeout(() => dispatch(resetNotification()), time * 1000);
  };
};

export const resetNotification = () => {
  return { type: 'RESET' };
};

export default notificationReducer;
