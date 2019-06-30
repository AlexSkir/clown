/* eslint-disable no-alert */
import React from 'react';
import { Redirect, Route, Link } from 'react-router-dom';
import './home.css';
import $ from 'jquery';
import CreateAnimation from './create/create';
import User from './user/user';
import About from './about/about';
import { user } from '../store/store';

class AppRouter extends React.Component {
  constructor() {
    super();
    this.state = {
      id: '',
      name: '',
      img: '',
      redirected: '',
      active: ''
    };
    this.onSuccess = this.onSuccess.bind(this);
  }

  componentWillMount() {
    if (!localStorage.getItem('page')) {
      this.setState({ redirected: '/about' });
    }
  }

  componentDidMount() {
    $(document.body).ready(() => {
      window.gapi.load('auth2', () => {
        window.gapi.auth2
          .init({
            client_id: '717448332612-evijnpopt50fj6vp0d9iul50sgdout90.apps.googleusercontent.com'
          })
          .then(() => {
            window.gapi.signin2.render('my-signIn', {
              scope: 'profile email',
              width: 240,
              height: 37,
              longtitle: true,
              onsuccess: this.onSuccess,
              onfailure: this.onFailure
            });
          });
      });
    });
  }

  onSuccess(googleUser) {
    const profile = googleUser.getBasicProfile();
    const ID = profile.getId();
    const fullName = profile.getName();
    const imageURL = profile.getImageUrl();

    user.dispatch({ type: 'name', value: fullName });
    this.setState({ id: ID, name: fullName, img: imageURL });
    $('#updateSaveButtonLoggedIn').click();
    if (localStorage.getItem('page') === 'create-animation') {
      // eslint-disable-next-line no-restricted-globals
      if (confirm('Are you sure you want to leave?') === true) {
        localStorage.setItem('auth', true);
        localStorage.setItem('page', `user/${ID}`);
        this.setState({ redirected: `user/${ID}` });
        $(document.body).css({ cursor: 'default' });
      }
    }
  }

  signOut() {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      this.setState({ redirected: 'about', id: '' });
      localStorage.setItem('page', 'about');
      localStorage.setItem('auth', false);
      user.dispatch({ type: 'name', value: '' });
    });
  }

  isRedirected() {
    user.dispatch({ type: 'imageURL', value: this.state.img });
    if (!localStorage.getItem('page')) {
      return <Redirect to="/clown/piskel-clown/build/about" />;
    }
    if (this.state.redirected) {
      return <Redirect to={`/clown/piskel-clown/build/${this.state.redirected}`} />;
    }
    return <Redirect to="/clown/piskel-clown/build/about" />;
  }

  addActiveClass(e) {
    const clicked = e.currentTarget.getAttribute('id');
    if (this.state.active === clicked) {
      this.setState({ active: '' });
    } else {
      this.setState({ active: clicked });
    }
  }

  render() {
    return (
      <div>
        <header className="header">
          <div className="header-menu">
            <span className="menu-icon">
              <i className="fas fa-bars" />
            </span>
            <ul className="menu">
              <li className="homepage">
                <Link
                  to="/clown/piskel-clown/build/about"
                  className="task-name"
                  onClick={e => {
                    if (localStorage.getItem('page') === 'create-animation') {
                      // eslint-disable-next-line no-restricted-globals
                      if (confirm('Are you sure you want to leave?') === true) {
                        this.setState({ redirected: 'about' });
                        localStorage.setItem('page', 'about');
                        localStorage.setItem('auth', true);
                        $(document.body).css({ cursor: 'default' });
                      }
                      e.preventDefault();
                    }
                  }}
                >
                  Piskel-clone
                </Link>
              </li>
              <li className="create menu-item">
                <Link
                  to="/clown/piskel-clown/build/create-animation"
                  className="create-link"
                  onClick={() => {
                    this.setState({ redirected: 'create-animation' });
                    localStorage.setItem('page', 'create-animation');
                    localStorage.setItem('auth', false);
                    $(document.body).css({ cursor: 'default' });
                  }}
                >
                  Create Animation
                </Link>
              </li>
              <li className="signin">
                <div
                  className={`menu-item ${this.state.id ? 'account' : 'hidden'}`}
                  id="list"
                  role="button"
                  tabIndex="-1"
                  onKeyPress={undefined}
                  onClick={e => {
                    this.addActiveClass(e);
                  }}
                >
                  <div
                    className="account-image"
                    style={{
                      backgroundImage: `url(${this.state.img})`,
                      backgroundSize: 'contain'
                    }}
                  />
                  <span className="account-button">{this.state.name}</span>
                  <i className="fas fa-sort-down" />
                  <ul className={`dropdown ${this.state.active === 'list' ? 'active' : 'hidden'}`}>
                    <li className={`list top ${this.state.active === 'list' ? '' : 'hidden'}`}>
                      <Link
                        to={`/clown/piskel-clown/build/user/${this.state.id}`}
                        id="galery"
                        className="account-item"
                        onClick={e => {
                          if (localStorage.getItem('page') === 'create-animation') {
                            // eslint-disable-next-line no-restricted-globals
                            if (confirm('Are you sure you want to leave?') === true) {
                              localStorage.setItem('auth', true);
                              localStorage.setItem('page', `user/${this.state.id}`);
                              this.setState({ redirected: localStorage.getItem('page') });
                              $(document.body).css({ cursor: 'default' });
                            }
                            e.preventDefault();
                          }
                        }}
                      >
                        My Galery
                      </Link>
                    </li>
                    <li className={`list bottom ${this.state.active === 'list' ? '' : 'hidden'}`}>
                      <Link
                        to={`/clown/piskel-clown/build/${
                          this.state.redirected ? this.state.redirected : 'about'
                        }`}
                        id="logout"
                        className="account-item"
                        onClick={() => {
                          // eslint-disable-next-line no-restricted-globals
                          if (confirm('Are you sure you want to leave?') === true) {
                            this.signOut();
                          }
                        }}
                      >
                        Log out
                      </Link>
                    </li>
                  </ul>
                </div>
                <div
                  id="my-signIn"
                  className={`${this.state.id ? 'hidden' : 'shown'}`}
                  onClick={() => {
                    localStorage.setItem('auth', true);
                  }}
                  onKeyPress={() => undefined}
                  role="button"
                  tabIndex="-1"
                />
                {this.isRedirected()}
              </li>
            </ul>
          </div>
        </header>
        <Route path="/clown/piskel-clown/build/about" exact component={About} />
        <Route path={`/clown/piskel-clown/build/user/${this.state.id}`} component={User} />
        <Route path="/clown/piskel-clown/build/create-animation" component={CreateAnimation} />
      </div>
    );
  }
}

export default AppRouter;
