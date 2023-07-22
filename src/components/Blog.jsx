import React from 'react';
import PropTypes from 'prop-types';

function Blog({ blog }) {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      {`--> title: ${blog.title}`}
      <br />
      {`--> author: ${blog.author}`}
      <br />
      {`--> URL: ${blog.url}`}
      <br />
      {`--> likes: ${blog.likes} `}
      <button type="button">like</button>
    </div>
  );
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
  }).isRequired,
};

export default Blog;
