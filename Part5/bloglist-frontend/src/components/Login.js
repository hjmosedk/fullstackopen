import React from 'react';
import PropTypes from 'prop-types';
import { useField } from '../hooks/index';

const Login = ({ handleLogin }) => {
  const username = useField('text');
  const password = useField('password');

  const handleSubmit = event => {
    event.preventDefault();
    handleLogin({ username: username.value, password: password.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Username: <input {...username} reset='' />
      </div>
      <div>
        Password: <input {...password} reset='' />
      </div>
      <button type='submit'>Login</button>
    </form>
  );
};

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default Login;
