import React from 'react';
import { Route, Link } from 'react-router-dom';
import './home.css';
import $ from 'jquery';
import CreateAnimation from './create/create';
import Login from './login/login';
import About from './about/about';
import store from '../store/store';

class AppRouter extends React.Component {
  constructor() {
    super();
    this.state = {};
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
              <li id="login" className="login menu-item">
                <Link
                  to="/clown/piskel-clown/build/login/"
                  className="login-link"
                  onClick={() => {
                    store.dispatch({ type: 'currentPage', value: 'login' });
                    $(document.body).css({ cursor: 'default' });
                  }}
                >
                  Log in
                </Link>
              </li>
            </ul>
          </div>
        </header>
        <Route path="/clown/piskel-clown/build/" exact component={About} />
        <Route path="/clown/piskel-clown/build/login/" component={Login} />
        <Route path="/clown/piskel-clown/build/create-animation/" component={CreateAnimation} />
      </div>
    );
  }
}

export default AppRouter;
