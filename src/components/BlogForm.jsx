import React, { useState } from 'react';
import PropTypes from 'prop-types';

function BlogForm({ addBlog }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const blog = { title, author, url };
    const ok = await addBlog(blog);
    if (!ok) {
      return;
    }
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
      <button type="submit">submit blog</button>
    </form>
  );
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
};

export default BlogForm;
