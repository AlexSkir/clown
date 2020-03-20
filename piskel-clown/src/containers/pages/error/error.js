import React from 'react';
import PropTypes from 'prop-types';
import makeAnimate from 'components/functions/animation';
import errorImage from 'assets/images/pages/error.jpg';
import 'containers/pages/error/error.css';


export default function ErrorPage(props) {
  if (props.error) {
    makeAnimate();
  }
  return (
    <div className={`error-section ${props.error ? 'error-page' : 'hidden'}`}>
      <div className="error-image-wrapper" id="error-image-wrapper">
        <img src={errorImage} alt="Oops! Somthing went wrong" />
      </div>
      <div className="error-text-wrapper">
        <span>Oops! Something went wrong :(</span>
        <span>Please refresh the Webpage!</span>
      </div>
    </div>
  );
}

ErrorPage.propTypes = {
  error: PropTypes.bool.isRequired
};
