import React from 'react';
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
            <span
              role="button"
              tabIndex="-1"
              onKeyPress={undefined}
              className="description"
              onClick={() => store.dispatch({ type: 'currentPage', value: 'login' })}
            >
              Google sign in
            </span>
            {' to access your gallery or simply '}
            <span
              role="button"
              tabIndex="-1"
              onKeyPress={undefined}
              className="description"
              onClick={() => store.dispatch({ type: 'currentPage', value: 'create' })}
            >
              create a new sprite.
            </span>
          </h2>
          <div className="home-buttons">
            <button type="button" className="login-button">
              <span
                role="button"
                tabIndex="-1"
                onKeyPress={undefined}
                className="link"
                onClick={() => store.dispatch({ type: 'currentPage', value: 'login' })}
              >
                Sign in
              </span>
            </button>
            <button type="button" className="create-button">
              <span
                role="button"
                tabIndex="-1"
                onKeyPress={undefined}
                className="link"
                onClick={() => store.dispatch({ type: 'currentPage', value: 'create' })}
              >
                Create Sprite
              </span>
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
