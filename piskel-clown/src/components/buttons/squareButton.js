import React from 'react';
import PropTypes from 'prop-types';

export default function SquareButton(props) {
  return (
    <button
      id={props.buttonID}
      className={props.buttonClass}
      type="button"
      onClick={props.onClickHandler}
    >
      {props.children}
    </button>
  );
}

SquareButton.propTypes = {
  buttonID: PropTypes.string,
  buttonClass: PropTypes.string,
  onClickHandler: PropTypes.func.isRequired,
};

SquareButton.defaultProps = {
  buttonClass: 'gif-button'
};
