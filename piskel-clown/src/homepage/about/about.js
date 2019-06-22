import React from 'react';
import { Link } from 'react-router-dom';
import store from '../../store/store';

class About extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="homepage-section">
        <div className="home-about">
          <h1>
            <span className="piskel">Piskel-clone </span>
            is a free online editor for animated sprites & pixel art
          </h1>
          <h2>Create animations in your browser.</h2>
          <h2>
            <span className="description">Try an example</span>
            {', use '}
            <Link
              to="/clown/piskel-clown/build/login/"
              className="description"
              onClick={() => store.dispatch({ type: 'currentPage', value: 'login' })}
            >
              Google sign in
            </Link>
            {' to access your gallery or simply '}
            <Link
              to="/clown/piskel-clown/build/create-animation/"
              className="description"
              onClick={() => store.dispatch({ type: 'currentPage', value: 'create' })}
            >
              create a new sprite.
            </Link>
          </h2>
          <div className="home-buttons">
            <button type="button" className="login-button">
              <Link
                to="/clown/piskel-clown/build/login/"
                className="link"
                onClick={() => store.dispatch({ type: 'currentPage', value: 'login' })}
              >
                Sign in
              </Link>
            </button>
            <button type="button" className="create-button">
              <Link
                to="/clown/piskel-clown/build/create-animation/"
                className="link"
                onClick={() => store.dispatch({ type: 'currentPage', value: 'create' })}
              >
                Create Sprite
              </Link>
            </button>
          </div>
        </div>
        <div className="home-image">
          <div className="screen" />
          <div className="home-preview" />
        </div>
      </div>
    );
  }
}

export default About;
