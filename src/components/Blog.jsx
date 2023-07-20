import React from 'react';
import PropTypes from 'prop-types';

function Blog({ blog }) {
  return (
    <div>
      {blog.title}
      {' '}
      {blog.author}
    </div>
  );
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  }).isRequired,
};

export default Blog;
