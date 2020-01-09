import React from 'react';
import { useField } from '../hooks/index';
import { connect } from 'react-redux';
import { login, reset } from '../reducers/signedinReducer';
import { setNotification } from '../reducers/notificationReducer';
import { Form, Button } from 'semantic-ui-react';

const Login = props => {
  const username = useField('text');
  const password = useField('password');

  const handleLogin = async event => {
    event.preventDefault();
    const credentials = {
      username: username.value,
      password: password.value,
    };
    props.login(credentials);
  };

  return (
    <Form onSubmit={handleLogin}>
      <Form.Field>
        <label>Username:</label>{' '}
        <input data-cy='username' {...username} reset='' />
      </Form.Field>
      <Form.Field>
        <label>Password:</label>{' '}
        <input data-cy='password' {...password} reset='' />
      </Form.Field>
      <Button data-cy='login' color={'purple'} type='submit'>
        Login
      </Button>
    </Form>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  login,
  setNotification,
  reset,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
