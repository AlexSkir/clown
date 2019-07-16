import React from 'react';
import error from './error.jpg';
import './error.css';

class Error extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="error-page">
        <div className="error-image-wrapper">
          <img src={error} alt="Oops! Somthing went wrong" />
        </div>
        <div className="error-text-wrapper">
          <span>Oops! Something went wrong :(</span>
          <span>Please refresh the Webpage!</span>
        </div>
      </div>
    );
  }
}

export default Error;
