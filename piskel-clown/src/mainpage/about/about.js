import React from 'react';
import $ from 'jquery';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Link,
  Switch,
  HashRouter
} from 'react-router-dom';
// import { store } from '../../store/store';
import CreateAnimation from '../create/create';

class About extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <HashRouter>
        <div className="homepage-section">
          <div className="home-about">
            <h1>
              <span className="piskel">Piskel-clone </span>
              is a free online editor for animated sprites & pixel art
            </h1>
            <h2>Create animations in your browser.</h2>
            <h2>
              <span className="description-link">Try an example</span>
              {', use '}
              <span
                role="button"
                tabIndex="-1"
                onKeyPress={undefined}
                className="description-link"
                onClick={() => $('.abcRioButton.abcRioButtonLightBlue').click()}
              >
                Google sign in
              </span>
              {' to access your gallery or simply '}
              <Link
                to="/create-animation"
                onClick={() => {
                  localStorage.setItem('page', 'create-animation');
                  localStorage.setItem('auth', false);
                  $(document.body).css({ cursor: 'default' });
                }}
                className="description-link"
              >
                create a new sprite.
              </Link>
            </h2>
            <div className="home-buttons">
              <button
                type="button"
                className="login-button"
                onClick={() => $('.abcRioButton.abcRioButtonLightBlue').click()}
              >
                Sign in
              </button>
              <button type="button" className="create-button">
                <Link
                  to="/create-animation"
                  onClick={() => {
                    localStorage.setItem('page', 'create-animation');
                    localStorage.setItem('auth', false);
                    $(document.body).css({ cursor: 'default' });
                  }}
                  className="link"
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

          <Route path="/create-animation" component={CreateAnimation} />
        </div>
      </HashRouter>
    );
  }
}

export default About;
