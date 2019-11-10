import React from 'react';
import PropTypes from 'prop-types';
import history from 'core/history';

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

function Link({ to, children, ...props }) {
  const handleClick = event => {
    if (props.onClick) {
      props.onClick(event);
    }

    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }

    if (event.defaultPrevented === true) {
      return;
    }

    event.preventDefault();
    history.push(to);
  };

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <a href={to} {...props} onClick={handleClick}>
      {children}
    </a>
  );
}

Link.defaultProps = {
  onClick: null,
};

Link.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

export default Link;
