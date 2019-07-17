import React from 'react';
import PropTypes from 'prop-types';
import error from './error.jpg';
import './error.css';

function makeRandom(from, to) {
  const number = Math.ceil(to - (to - from) * Math.random());
  return number;
}

function makeAnimate() {
  const width = 100 - (480 * 100) / window.innerWidth;
  const height = 100 - (375 * 100) / window.innerHeight;
  const top = (55 * 100) / window.innerHeight;
  const bottom = window.innerHeight - 370;
  const animation = document.getElementById('error-image-wrapper').animate(
    [
      { top: '55px', left: '0' }, // 0
      { top: `${makeRandom(top, height)}%`, left: `${makeRandom(0, width / 2)}%` }, // 10%
      { top: `${makeRandom(top, height)}%`, left: `${makeRandom(0, width / 2)}%` }, // 20%
      { top: `${bottom}px`, left: `${makeRandom(width / 2, width)}%` }, // 30%
      { top: `${makeRandom(top, height)}%`, left: `${makeRandom(width / 2, width)}%` }, // 40%
      { top: '55px', left: `${width}%` }, // 50%
      { top: `${makeRandom(top, height)}%`, left: `${makeRandom(width / 2, width)}%` }, // 60%
      { top: `${bottom}px`, left: `${makeRandom(width / 2, width)}%` }, // 70%
      { top: `${makeRandom(top, height)}%`, left: `${makeRandom(0, width / 2)}%` }, // 80%
      { top: `${makeRandom(top, height)}%`, left: `${makeRandom(0, width / 2)}%` }, // 90%
      { top: '55px', left: '0' } // 100%
    ],
    {
      duration: 30000,
      delay: 0,
      easing: 'linear'
    }
  );
  animation.play();
  setTimeout(() => {
    makeAnimate();
  }, 30000);
}

class Error extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  isPropsReceived() {
    if (this.props.state) {
      makeAnimate();
    }
  }

  render() {
    return (
      <div className="error-page">
        <div className="error-image-wrapper" id="error-image-wrapper">
          <img src={error} alt="Oops! Somthing went wrong" />
        </div>
        <div className="error-text-wrapper">
          <span>Oops! Something went wrong :(</span>
          <span>Please refresh the Webpage!</span>
        </div>
        {this.isPropsReceived()}
      </div>
    );
  }
}

Error.propTypes = {
  state: PropTypes.bool.isRequired
};

export default Error;
