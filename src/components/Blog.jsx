import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Blog({ blog }) {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible(!visible);

  const showWhenVisible = { display: visible ? '' : 'none' };
  const hideWhenVisible = { display: visible ? 'none' : '' };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        <button type="button" onClick={toggleVisibility}>show blog</button>
        {blog.title}
      </div>
      <div style={showWhenVisible}>
        <button type="button" onClick={toggleVisibility}>hide</button>
        {blog.title}
        <br />
        {`--> author: ${blog.author}`}
        <br />
        {`--> URL: ${blog.url}`}
        <br />
        {`--> submitted by: ${blog.user.username} `}
        <br />
        {`--> likes: ${blog.likes} `}
        <button type="button">like</button>
      </div>
    </div>
  );
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
  }).isRequired,
};

export default Blog;
