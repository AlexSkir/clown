import React from 'react';
import { Redirect, Route, Link } from 'react-router-dom';
import './home.css';
import $ from 'jquery';
import CreateAnimation from './create/create';
import User from './user/user';
import About from './about/about';
import store from '../store/store';

class AppRouter extends React.Component {
  constructor() {
    super();
    this.state = {
      id: '',
      name: '',
      img: '',
      redirected: false,
      active: ''
    };
    this.onSuccess = this.onSuccess.bind(this);
  }

  componentDidMount() {
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
  }

  onSuccess(googleUser) {
    const profile = googleUser.getBasicProfile();
    const ID = profile.getId();
    const fullName = profile.getName();
    const imageURL = profile.getImageUrl();

    store.dispatch({ type: 'name', value: fullName });
    this.setState({ id: ID, name: fullName, img: imageURL, redirected: true });
  }

  signOut() {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      this.setState({ redirected: false });
    });
  }

  isRedirected() {
    if (this.state.redirected === true) {
      store.dispatch({ type: 'imageURL', value: this.state.img });
      return <Redirect to={`/clown/piskel-clown/build/user/${this.state.id}`} />;
    }
    return <Redirect to="/clown/piskel-clown/build/" />;
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
                  to="/clown/piskel-clown/build/"
                  className="task-name"
                  onClick={() => {
                    store.dispatch({ type: 'currentPage', value: 'about' });
                    $(document.body).css({ cursor: 'default' });
                  }}
                >
                  Piskel-clone
                </Link>
              </li>
              <li className="create menu-item">
                <Link
                  to="/clown/piskel-clown/build/create-animation/"
                  className="create-link"
                  onClick={() => {
                    store.dispatch({ type: 'currentPage', value: 'create' });
                    $(document.body).css({ cursor: 'default' });
                  }}
                >
                  Create Animation
                </Link>
              </li>
              <li className="signin">
                <div
                  className={`menu-item ${this.state.redirected === true ? 'account' : 'hidden'}`}
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
                      >
                        My Galery
                      </Link>
                    </li>
                    <li className={`list bottom ${this.state.active === 'list' ? '' : 'hidden'}`}>
                      <Link
                        to="/clown/piskel-clown/build/"
                        id="logout"
                        className="account-item"
                        onClick={() => this.signOut()}
                      >
                        Log out
                      </Link>
                    </li>
                  </ul>
                </div>
                {this.isRedirected()}
                <div
                  id="my-signIn"
                  className={`${this.state.redirected === true ? 'hidden' : 'shown'}`}
                />
              </li>
            </ul>
          </div>
        </header>
        <Route path="/clown/piskel-clown/build/" exact component={About} />
        <Route path={`/clown/piskel-clown/build/user/${this.state.id}`} component={User} />
        <Route path="/clown/piskel-clown/build/create-animation/" component={CreateAnimation} />
      </div>
    );
  }
}

export default AppRouter;
