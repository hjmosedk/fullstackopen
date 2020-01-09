import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import blogReducer from './reducers/blogReducer';
import notificationReducer from './reducers/notificationReducer';
import signedinReducer from './reducers/signedinReducer';
import usersReducer from './reducers/userReducer';

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  user: signedinReducer,
  users: usersReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
