import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Login from "./components/Login";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

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
        "loggedBlogAppUser",
        JSON.stringify(returnedUserInfo),
      );

      setNotificationMessage("logged in");
      setTimeout(() => {
        setNotificationMessage("");
      }, 5000);
      return true;
    } catch (err) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);

      return false;
    }
  };

  const logout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
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

    setNotificationMessage("blog created");
    setInterval(() => {
      setNotificationMessage(null);
    }, 5000);

    return true;
  };

  const likeBlog = async (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };

    setBlogs(blogs.map((b) => (b.id === blog.id ? updatedBlog : b)));

    const res = await blogService.update(blog.id, {
      ...updatedBlog,
      user: blog.user.id,
    });

    if (res.error) {
      setErrorMessage(res.error);
      setInterval(() => {
        setErrorMessage(null);
      }, 5000);
      return false;
    }

    setNotificationMessage("blog liked");
    setInterval(() => {
      setNotificationMessage(null);
    }, 5000);

    return true;
  };

  const deleteBlog = async (blogId) => {
    const res = await blogService.remove(blogId);

    if (res.error) {
      setErrorMessage(res.error);
      setInterval(() => {
        setErrorMessage(null);
      }, 5000);
      return false;
    }

    setBlogs(blogs.filter((b) => b.id !== blogId));

    setNotificationMessage("blog deleted");
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
      const returnedBlogs = res.data;
      returnedBlogs.sort((a, b) => (a.likes < b.likes ? 1 : -1));
      setBlogs(returnedBlogs);
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    blogs.sort((a, b) => (a.likes < b.likes ? 1 : -1));
  }, [blogs]);

  // try finding the user's token in local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");

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
      <h1>Blog App</h1>
      {errorMessage ? <p>{errorMessage}</p> : null}
      {notificationMessage ? <p>{notificationMessage}</p> : null}
      {user === null ? (
        <Togglable buttonId="toggle-login-form" buttonLabel="login" hideLabel="cancel">
          <Login login={login} />
        </Togglable>
      ) : (
        <>
          <p>
            {user.name}
            {' '}
            logged in
          </p>
          {" "}
          <button type="submit" onClick={logout}>
            logout
          </button>
          <Togglable buttonId="toggle-blog-form" buttonLabel="create new blog" hideLabel="cancel">
            <BlogForm addBlog={addBlog} />
          </Togglable>
          {" "}
          <h2>blogs</h2>
          {blogs.map((blog) => (
            <div key={blog.id}>
              <Blog blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} />
              <br />
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default App;
