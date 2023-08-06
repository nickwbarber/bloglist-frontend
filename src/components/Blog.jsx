import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Blog({
  blog, likeBlog, deleteBlog, currentUsername,
}) {
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
    <div className="blogContent" style={blogStyle}>
      <div className="whenHidden" style={hideWhenVisible}>
        <button className="showButton" type="button" onClick={toggleVisibility}>
          show blog
        </button>
        <span className="titleWhenHidden">{blog.title}</span>
      </div>
      <div className="whenVisible" style={showWhenVisible}>
        <button className="hideButton" type="button" onClick={toggleVisibility}>
          hide
        </button>
        <span className="titleWhenVisible">{blog.title}</span>
        <br />
        <span className="author">{`--> author: ${blog.author}`}</span>
        <br />
        <span className="url">{`--> URL: ${blog.url}`}</span>
        <br />
        <span className="username">{`--> submitted by: ${blog.user.username} `}</span>
        <br />
        <span className="likes">{`--> likes: ${blog.likes} `}</span>
        <button
          className="likeButton"
          type="button"
          onClick={() => likeBlog(blog)}
        >
          like
        </button>
        <br />
        {currentUsername === blog.user.username
          ? (
            <button
              className="deleteButton"
              type="button"
              onClick={() => deleteBlog(blog.id)}
            >
              delete
            </button>
          ) : null}
      </div>
    </div>
  );
}

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    // FIXME: this should be an object
    // user: PropTypes.string.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    likes: PropTypes.number.isRequired,
  }).isRequired,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  currentUsername: PropTypes.string.isRequired,
};

export default Blog;
