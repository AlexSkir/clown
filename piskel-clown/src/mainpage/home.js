/* eslint-disable no-alert */
import React from 'react';
import { Redirect, Route, Link, HashRouter, Switch } from 'react-router-dom';
import './home.css';
import $ from 'jquery';
import CreateAnimation from './create/create';
import User from './user/user';
import { About, makeRandomId } from './about/about';
import Error from './error/error';
import { user, preview } from '../store/store';

class AppRouter extends React.Component {
  constructor() {
    super();
    this.state = {
      id: '',
      name: '',
      img: '',
      redirected: '',
      active: '',
      auth: false,
      error: false
    };
    this.onSuccess = this.onSuccess.bind(this);
  }

  componentWillMount() {
    if (!localStorage.getItem('page')) {
      this.setState({ redirected: '' });
    } else {
      this.setState({ redirected: localStorage.getItem('page') });
    }
  }

  componentDidMount() {
    setTimeout(() => {
      $(document.body).ready(() => {
        window.gapi.load('client:auth2', () => {
          window.gapi.auth2
            .init({
              client_id: '717448332612-evijnpopt50fj6vp0d9iul50sgdout90.apps.googleusercontent.com'
            })
            .then(() => {
              window.gapi.signin2.render('my-signIn', {
                scope: 'https://www.googleapis.com/auth/drive.file',
                width: 240,
                height: 37,
                longtitle: true,
                onsuccess: this.onSuccess,
                onfailure: this.onFailure
              });
            });
        });
      });
    }, 200);
  }

  onSuccess(googleUser) {
    const profile = googleUser.getBasicProfile();
    const ID = profile.getId();
    const fullName = profile.getName();
    const imageURL = profile.getImageUrl();
    const email = profile.getEmail();
    user.dispatch({ type: 'email', value: email });
    user.dispatch({ type: 'userID', value: ID });
    localStorage.setItem('userID', ID);
    user.dispatch({ type: 'name', value: fullName });
    this.setState({ id: ID, name: fullName, img: imageURL, auth: true });
    $('#updateSaveButtonLoggedIn').click();
    $('#updateGoogleButtonLoggedIn').click();
    localStorage.setItem('auth', true);
    if (localStorage.getItem('page')) {
      if (localStorage.getItem('page').indexOf('create') === -1) {
        this.setState({ redirected: localStorage.getItem('page') });
      }
    } else {
      localStorage.setItem('page', `user/${ID}`);
      this.setState({ redirected: `user/${ID}` });
      $(document.body).css({ cursor: 'default' });
    }
  }

  signOut() {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      this.setState({ redirected: '', id: '', auth: false });
      localStorage.setItem('page', '');
      localStorage.setItem('auth', false);
      user.dispatch({ type: 'name', value: '' });
    });
  }

  isRedirected() {
    user.dispatch({ type: 'imageURL', value: this.state.img });
    if (!localStorage.getItem('page')) {
      return <Redirect to="/" />;
    }
    if (this.state.redirected) {
      return <Redirect to={`/${this.state.redirected}`} />;
    }
    return <Redirect to="/" />;
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
      <HashRouter>
        <div>
          <header className="header">
            <div className="header-menu">
              <span className="menu-icon">
                <i className="fas fa-bars" />
              </span>
              <ul className="menu">
                <li className="homepage">
                  <Link
                    to="/"
                    className="task-name"
                    onClick={e => {
                      if (!localStorage.getItem('auth')) {
                        this.setState({ auth: false });
                      }
                      if (localStorage.getItem('page')) {
                        if (localStorage.getItem('page').indexOf('create') !== -1) {
                          // eslint-disable-next-line no-restricted-globals
                          if (confirm('Are you sure you want to leave?') === true) {
                            this.setState({ redirected: 'about' });
                            localStorage.setItem('page', 'about');
                            $(document.body).css({ cursor: 'default' });
                            return;
                          }
                          e.preventDefault();
                        } else {
                          this.setState({ redirected: 'about' });
                          localStorage.setItem('page', 'about');
                          $(document.body).css({ cursor: 'default' });
                        }
                      }
                    }}
                  >
                    Piskel-clone
                  </Link>
                </li>
                <li className="create menu-item">
                  <Link
                    to="/create-animation"
                    className="create-link"
                    onClick={e => {
                      if (localStorage.getItem('page')) {
                        if (localStorage.getItem('page').indexOf('create') !== -1) {
                          // eslint-disable-next-line no-restricted-globals
                          if (confirm('Are you sure you want to leave?') === true) {
                            const piskel = makeRandomId();
                            preview.dispatch({ type: 'piskelID', value: piskel });
                            this.setState({ redirected: `create-animation/${piskel}` });
                            localStorage.setItem('page', `create-animation/${piskel}`);
                            localStorage.setItem('project', piskel);
                            $(document.body).css({ cursor: 'default' });
                            return;
                          }
                          e.preventDefault();
                          return;
                        }
                      }
                      const piskel = makeRandomId();
                      preview.dispatch({ type: 'piskelID', value: piskel });
                      this.setState({ redirected: `create-animation/${piskel}` });
                      localStorage.setItem('page', `create-animation/${piskel}`);
                      localStorage.setItem('project', piskel);
                      $(document.body).css({ cursor: 'default' });
                    }}
                  >
                    Create Animation
                  </Link>
                </li>
                <li className="signin">
                  <div
                    className={`menu-item ${this.state.auth ? 'account' : 'hidden'}`}
                    id="list"
                    role="button"
                    tabIndex="-1"
                    onKeyPress={undefined}
                    onClick={e => {
                      if (!localStorage.getItem('auth')) {
                        $('#signOuted').click();
                        return;
                      }
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
                    <ul
                      className={`dropdown ${this.state.active === 'list' ? 'active' : 'hidden'}`}
                    >
                      <li className={`list top ${this.state.active === 'list' ? '' : 'hidden'}`}>
                        <Link
                          to={`/user/${this.state.id}`}
                          id="galery"
                          className="account-item"
                          onClick={e => {
                            if (localStorage.getItem('page')) {
                              if (localStorage.getItem('page').indexOf('create') !== -1) {
                                // eslint-disable-next-line no-restricted-globals
                                if (confirm('Are you sure you want to leave?') === true) {
                                  localStorage.setItem('page', `user/${this.state.id}`);
                                  this.setState({ redirected: localStorage.getItem('page') });
                                  $(document.body).css({ cursor: 'default' });
                                  return;
                                }
                                e.preventDefault();
                              } else {
                                localStorage.setItem('page', `user/${this.state.id}`);
                                this.setState({ redirected: localStorage.getItem('page') });
                                $(document.body).css({ cursor: 'default' });
                              }
                            }
                          }}
                        >
                          My Galery
                        </Link>
                      </li>
                      <li className={`list bottom ${this.state.active === 'list' ? '' : 'hidden'}`}>
                        <Link
                          to={`/${this.state.redirected}`}
                          id="logout"
                          className="account-item"
                          onClick={e => {
                            // eslint-disable-next-line no-restricted-globals
                            if (confirm('Are you sure you want to leave?') === true) {
                              this.signOut();
                            } else {
                              e.preventDefault();
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
                    className={`${this.state.auth ? 'hidden' : 'shown'}`}
                    onClick={() => {
                      // localStorage.setItem('auth', true);
                    }}
                    onKeyPress={() => undefined}
                    role="button"
                    tabIndex="-1"
                  />
                  {this.isRedirected()}
                </li>
              </ul>
            </div>
            <button
              id="signOuted"
              type="button"
              className="hidden"
              onClick={() => this.setState({ auth: false, error: true })}
            />
          </header>
          <div className={`error-section ${this.state.error ? 'blocked' : 'hidden'}`}>
            <Error state={this.state.error} />
          </div>
          <div className={`${this.state.error ? 'hidden' : ''}`}>
            <Switch>
              <Route path="/" exact component={About} />
              <Route path={`/user/${this.state.id}`} component={User} />
              <Route path="/create-animation/*" component={CreateAnimation} />
              <Route path="*" component={About} />
            </Switch>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default AppRouter;
