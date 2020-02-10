import React, { useState } from 'react';

const LoginForm = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (!props.show) {
    return null;
  }

  const submit = async event => {
    event.preventDefault();

    const user = await props.login({
      variables: { username, password },
    });

    if (user) {
      const token = user.data.login.value;
      props.setToken(token);
      localStorage.setItem('user', token);
    }
    props.setPage('books');
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          Username{' '}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password{' '}
          <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
