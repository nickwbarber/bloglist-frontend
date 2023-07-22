import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BlogForm from './BlogForm';
import Login from './Login';

function Togglable(props) {
  const { children, buttonLabel, hideLabel } = props;

  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible(!visible);

  const showWhenVisible = { display: visible ? '' : 'none' };
  const hideWhenVisible = { display: visible ? 'none' : '' };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button type="button" onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        <div>{children}</div>
        <button type="button" onClick={toggleVisibility}>{hideLabel}</button>
      </div>
    </div>
  );
}

Togglable.propTypes = {
  // FIXME: this isn't the correct way to reference JSX elements
  children: PropTypes.oneOfType([
    PropTypes.instanceOf(Login),
    PropTypes.instanceOf(BlogForm),
  ]).isRequired,
  buttonLabel: PropTypes.string.isRequired,
  hideLabel: PropTypes.string.isRequired,
};

export default Togglable;
