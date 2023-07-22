import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Login from './components/Login';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const login = async ({ username, password }) => {
    try {
      const returnedUserInfo = await loginService.login({
        username,
        password,
      });

      setUser(returnedUserInfo);
      blogService.setToken(returnedUserInfo.token);
      window.localStorage.setItem(
        'loggedBlogAppUser',
        JSON.stringify(returnedUserInfo),
      );

      setNotificationMessage('logged in');
      setTimeout(() => {
        setNotificationMessage('');
      }, 5000);
      return true;
    } catch (err) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);

      return false;
    }
  };

  const logout = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    setUser(null);
  };

  const addBlog = async (blog) => {
    const res = await blogService.create(blog);

    if (res.error) {
      setErrorMessage(res.error);
      setInterval(() => {
        setErrorMessage(null);
      }, 5000);
      return false;
    }

    setBlogs([...blogs, res.data]);

    setNotificationMessage('blog created');
    setInterval(() => {
      setNotificationMessage(null);
    }, 5000);

    return true;
  };

  const likeBlog = async (blog) => {
    const updatedBlog = { ...blog, user: blog.user.id, likes: blog.likes + 1 };

    setBlogs(blogs.map((b) => (b.id === blog.id ? updatedBlog : b)));

    // FIXME: When the response is receieved, the user information in the UI is lost
    const res = await blogService.update(blog.id, updatedBlog);

    if (res.error) {
      setErrorMessage(res.error);
      setInterval(() => {
        setErrorMessage(null);
      }, 5000);
      return false;
    }

    setNotificationMessage('blog liked');
    setInterval(() => {
      setNotificationMessage(null);
    }, 5000);

    return true;
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

  // try finding the user's token in local storage
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
        <Togglable buttonLabel="login" hideLabel="cancel">
          <Login login={login} />
        </Togglable>
      ) : (
        <>
          <p>
            {user.name}
            {' '}
            logged in
          </p>
          {' '}
          <button type="submit" onClick={logout}>
            logout
          </button>
          <Togglable buttonLabel="create new blog" hideLabel="cancel">
            <BlogForm addBlog={addBlog} />
          </Togglable>
          {' '}
          <h2>blogs</h2>
          {blogs.map((blog) => (
            <div key={blog.id}>
              <Blog blog={blog} likeBlog={likeBlog} />
              <br />
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default App;
