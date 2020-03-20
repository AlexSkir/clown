import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import 'components/header/header.css';
import AccountButton from 'containers/accountButton/accountButton';
import { pageNavigator } from 'components/functions/navigation';

export default function Header(props) {
  return (
    <header className="header">
      <ul className="header-menu">
        <li className="logo">
          <Link
            id="/about"
            to="/about"
            className="logo-text"
            onClick={e => pageNavigator(e, props.page, 'about', props.isAuthed)}>
            Piskel-clone
            </Link>
        </li>
        <li className="header-buttons">
          <div className="create menu-item flexed">
            <Link
              id="/create"
              to="/create-animation"
              className="create-link"
              onClick={e => pageNavigator(e, props.page, 'create', props.isAuthed)}
            >
              Create Animation
            </Link>
          </div>
          <div className="signin">
            <AccountButton />
            <div id="my-signIn" className={`${props.isAuthed ? 'hidden' : 'shown'}`} />
          </div>
        </li>
      </ul>
    </header>
  );
}

Header.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
  page: PropTypes.string.isRequired
};
