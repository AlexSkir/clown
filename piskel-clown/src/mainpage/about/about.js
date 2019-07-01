import React from 'react';
import $ from 'jquery';
// import { store } from '../../store/store';
// import CreateAnimation from '../create/create';

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
            <span
              onKeyPress={() => undefined}
              role="button"
              onFocus={() => undefined}
              tabIndex="-1"
              onClick={() => {
                localStorage.setItem('page', 'create-animation');
                localStorage.setItem('auth', false);
                $(document.body).css({ cursor: 'default' });
                $('#create-animation').click();
              }}
              className="description-link"
            >
              create a new sprite.
            </span>
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
              <span
                onKeyPress={() => undefined}
                role="button"
                onFocus={() => undefined}
                tabIndex="-1"
                onClick={() => {
                  localStorage.setItem('page', 'create-animation');
                  localStorage.setItem('auth', false);
                  $(document.body).css({ cursor: 'default' });
                  $('#create-animation').click();
                }}
                className="link"
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
        {/* <Switch>
            <Route path="/clown/piskel-clown/build/" exact component={About} />
            <Route path={`/clown/piskel-clown/build/user/${this.state.id}`} component={User} /> */}
        {/* <Route path="/clown/piskel-clown/build/create-animation" component={CreateAnimation} /> */}
        {/* <Route component={About} />
          </Switch> */}
      </div>
    );
  }
}

export default About;
