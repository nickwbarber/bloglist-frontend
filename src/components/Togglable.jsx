import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Togglable(props) {
  const { children, buttonLabel } = props;

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
        <button type="button" onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
}

Togglable.propTypes = {
  children: PropTypes.func.isRequired,
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
