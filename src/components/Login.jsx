import React, { useState } from 'react';
import PropTypes from 'prop-types';
import loginService from '../services/login';
import blogService from '../services/blogs';

const loginWithUsernameAndPassword = async (username, password) => {
  const user = await loginService.login({
    username,
    password,
  });
  window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
  return user;
};

function Login({ setUser, setErrorMessage, setNotificationMessage }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginWithUsernameAndPassword(username, password);
      setUser(user);
      blogService.setToken(user.token);
      setTimeout(() => {
        setNotificationMessage('logged in');
      }, 5000);
      setUsername('');
      setPassword('');
    } catch (err) {
      setErrorMessage('Wrong credentials');
      setPassword('');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          {' '}
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          {' '}
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
}

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
  setNotificationMessage: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
};

export default Login;
