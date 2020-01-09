import React, { useEffect } from 'react';
import Login from './components/Login';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import ToggleElement from './components/ToggleElement';
import { initializeblogs } from './reducers/blogReducer';
import { connect } from 'react-redux';
import BlogList from './components/BlogList';
import { loggedin, reset } from './reducers/signedinReducer';
import Users from './components/Users';
import { initializeUsers } from './reducers/userReducer';
import { Container, Menu, Button } from 'semantic-ui-react';
import User from './components/User';
import Blog from './components/Blog';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
} from 'react-router-dom';

const App = props => {
  const blogFormRef = React.createRef();

  useEffect(() => {
    props.initializeblogs();
  }, []);

  useEffect(() => {
    const userInStorage = window.localStorage.getItem('userLogIn');
    if (userInStorage) {
      const user = JSON.parse(userInStorage);
      props.loggedin(user);
    }
  }, []);

  useEffect(() => {
    props.initializeUsers();
  }, []);

  const handleLogout = event => {
    event.preventDefault();
    window.localStorage.removeItem('userLogIn');
    props.reset();
  };

  const findById = (id, state) => state.find(result => result.id === id);

  return (
    <Container>
      <div>
        <Notification />
        <Router>
          {props.user === null ? (
            <div>
              <h2>Log in to application</h2>
              <Login />
            </div>
          ) : (
            <div>
              <Menu color={'violet'} inverted>
                <Menu.Item>
                  <Link style={{ textDecoration: 'underline' }} to='/'>
                    Blogs
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link style={{ textDecoration: 'underline' }} to='/users'>
                    Users
                  </Link>
                </Menu.Item>
                <Menu.Item>{props.user.name} has logged in </Menu.Item>
                <Menu.Item>
                  <Button color={'purple'} type='submit' onClick={handleLogout}>
                    Logout
                  </Button>{' '}
                </Menu.Item>
              </Menu>
              <Route
                exact
                path='/'
                render={() => (
                  <ToggleElement buttonLabel='New Blog' ref={blogFormRef}>
                    <BlogForm />
                  </ToggleElement>
                )}
              />
              <Route exact path='/' render={() => <BlogList />} />
              <Route exact path='/users' render={() => <Users />} />

              <br />
              <Route
                exact
                path='/users/:id'
                render={({ match }) => (
                  <User user={findById(match.params.id, props.users)} />
                )}
              />
              <Route
                exact
                path='/blogs/:id'
                render={({ match }) => (
                  <Blog blog={findById(match.params.id, props.blogs)} />
                )}
              />
            </div>
          )}
        </Router>
      </div>
    </Container>
  );
};

const mapDispatchToProps = {
  initializeblogs,
  loggedin,
  initializeUsers,
  reset,
};

const mapStateToProps = state => {
  return {
    user: state.user,
    users: state.users,
    blogs: state.blogs,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
