import React, { useState } from 'react';
import PropTypes from 'prop-types';
import blogService from '../services/blogs';

function BlogForm({ setBlogs, setNotificationMessage, setErrorMessage }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await blogService.create({ title, author, url });

    if (res.error) {
      console.error(res.error);
      setErrorMessage(res.error);
      setInterval(() => {
        setErrorMessage(null);
      }, 5000);
    }

    console.log('blog created');
    setNotificationMessage('blog created');
    setInterval(() => {
      setNotificationMessage(null);
    }, 5000);

    setBlogs((prevBlogs) => [...prevBlogs, res.data]);

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <span>title: </span>
        <input
          type="text"
          name="title"
          placeholder="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <br />
      <div>
        <span>author: </span>
        <input
          type="text"
          name="author"
          placeholder="author"
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
        />
      </div>
      <br />
      <div>
        <span>url: </span>
        <input
          type="text"
          name="url"
          placeholder="url"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />
      </div>
      <br />
      <button type="submit">create</button>
    </form>
  );
}

BlogForm.propTypes = {
  setBlogs: PropTypes.func.isRequired,
  setNotificationMessage: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
};

export default BlogForm;
