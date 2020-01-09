import loginService from '../services/login';
import { setNotification } from './notificationReducer';

export const login = credentials => {
  return async dispatch => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem('userLogIn', JSON.stringify(user));
      dispatch({ type: 'LOGIN', data: user });
    } catch (exception) {
      return dispatch(setNotification(`Wrong Credentials`, 'error', 10));
    }
  };
};

export const loggedin = user => {
  return { type: 'LOGGEDIN', data: user };
};

export const reset = () => {
  return { type: 'RESET' };
};

const signedinReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data;
    case 'LOGGEDIN':
      return action.data;
    case 'RESET':
      return (state = null);
    default:
      return state;
  }
};

export default signedinReducer;
