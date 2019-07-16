/* eslint-disable no-bitwise */
import React from 'react';
import $ from 'jquery';
import { Redirect } from 'react-router-dom';
import { preview, store } from '../../store/store';

function makeRandomId() {
  const j = [];
  let x;
  for (let i = 0; i < 20; i += 1) {
    x = [[48, 57], [65, 90], [97, 122]][(Math.random() * 3) >> 0];
    j[i] = String.fromCharCode(((Math.random() * (x[1] - x[0] + 1)) >> 0) + x[0]);
  }
  return j.join('');
}

class About extends React.Component {
  constructor() {
    super();
    this.state = {
      page: ''
    };
    this.id = '';
  }

  isRedirected(span) {
    if (this.state.page) {
      return <Redirect to={`/create-animation/${this.id}`} />;
    }
    if (span) {
      return <span className="description-link">Create a new Sprite</span>;
    }
    return <span className="link">Create Sprite</span>;
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
            <button
              type="button"
              className="text-button"
              onClick={() => {
                this.id = makeRandomId();
                preview.dispatch({ type: 'piskelID', value: this.id });
                store.dispatch({ type: 'currentPage', value: `create-animation/${this.id}` });
                this.setState({ page: `create-animation/${this.id}` });
                localStorage.setItem('page', `create-animation/${this.id}`);
                localStorage.setItem('auth', false);
                localStorage.setItem('project', this.id);
                $(document.body).css({ cursor: 'default' });
              }}
            >
              {this.isRedirected('span')}
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
              onClick={() => {
                this.id = makeRandomId();
                preview.dispatch({ type: 'piskelID', value: this.id });
                this.setState({ page: `create-animation/${this.id}` });
                localStorage.setItem('page', `create-animation/${this.id}`);
                localStorage.setItem('auth', false);
                localStorage.setItem('project', this.id);
                $(document.body).css({ cursor: 'default' });
              }}
            >
              {this.isRedirected()}
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

export { About, makeRandomId };
