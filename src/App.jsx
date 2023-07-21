import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Login from './components/Login';
import Togglable from './components/Togglable';
import blogService from './services/blogs';

function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const logout = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    setUser(null);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await blogService.getAll();
      if (res.error) {
        setErrorMessage(res.error);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        return;
      }
      setBlogs(res.data);
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');

    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
    }
  }, []);

  return (
    // if the user is logged in, show the blogs
    // otherwise show the login form
    <div>
      {errorMessage ? <p>{errorMessage}</p> : null}
      {notificationMessage ? <p>{notificationMessage}</p> : null}
      {user === null ? (
        <Togglable buttonLabel="login">
          <Login
            setUser={setUser}
            setErrorMessage={setErrorMessage}
            setNotificationMessage={setNotificationMessage}
          />
        </Togglable>
      ) : (
        <>
          <p>
            {user.name}
            {' '}
            logged in
          </p>
          <button type="submit" onClick={logout}>
            logout
          </button>

          <h3>create new blog</h3>
          <BlogForm
            setBlogs={setBlogs}
            setErrorMessage={setErrorMessage}
            setNotificationMessage={setNotificationMessage}
          />

          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
}

export default App;
