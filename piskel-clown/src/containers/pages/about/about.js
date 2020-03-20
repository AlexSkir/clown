import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import $ from 'jquery';
import { pageNavigator } from 'components/functions/navigation';
import 'containers/pages/about/about.css';
import previewExampleGif from 'assets/images/pages/preview-example.gif';
import googleIcon from 'assets/images/pages/google-icon.png';
import exportIcon from 'assets/images/pages/export-gif.png';
import privatePage from 'assets/images/pages/private-page.png';

function About(props) {
  return (
    <div className="homepage-section">
      <div className="about-app-wrapper">
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
            <button
              type="button"
              className="text-button"
              onClick={e => pageNavigator(e, 'about', 'create', props.isAuthed)}
            >
              <span className="description-link">Create a new Sprite</span>
            </button>
          </h2>
          <div className="home-buttons">
            <button
              type="button"
              className="login-button"
              onClick={() => $('.abcRioButton.abcRioButtonLightBlue').click()}
            >
              Sign in
            </button>
            <button
              type="button"
              className="create-button"
              onClick={e => pageNavigator(e, 'about', 'create', props.isAuthed)}
            >
              <span className="link">Create Sprite</span>
            </button>
          </div>
        </div>

        <div className="home-image">
          <div className="screen" />
          <div className="home-preview" />
        </div>
      </div>
      <div className="app-description-wrapper">
        <div className="description-item">
          <img className="description-image" src={previewExampleGif} alt="piskel-example" />
          <div className="description-body">
            <h3 className="description-title">
              Live preview
              </h3>
            <p className="description-text">
              Check a preview of your animation in real time as you draw. Adjust the frame delay on the fly.
              </p>
          </div>
        </div>
        <div className="description-item">
          <img className="description-image" src={googleIcon} alt="google-icon" />
          <div className="description-body">
            <h3 className="description-title">
              Google Sign in
              </h3>
            <p className="description-text">
              No need to remember yet another password, just use your Google account to sign in.
              </p>
          </div>
        </div>
        <div className="description-item">
          <img className="description-image" src={exportIcon} alt="export-icon" />
          <div className="description-body">
            <h3 className="description-title">
              Export to GIF, PNG
              </h3>
            <p className="description-text">
              Several export modes supported. Animated GIFs for sharing, spritesheet PNG/ZIP for bigger projects
              </p>
          </div>
        </div>
        <div className="description-item">
          <img className="description-image" src={privatePage} alt="personal-page-icon" />
          <div className="description-body">
            <h3 className="description-title">
              Private gallery
              </h3>
            <p className="description-text">
              You can chose to make any of your sprites public or private.
              Private sprites are only visible to you.
              </p>
          </div>
        </div>
      </div>
    </div>
  );
}

About.propTypes = {
  isAuthed: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({ isAuthed: state.userData.isAuthed });
export default connect(mapStateToProps)(About);
