import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import store from 'store/store';
import { signOut } from 'services/googleAuth/authApi';
import 'containers/accountButton/accountButton.css';
import { pageNavigator } from 'components/functions/navigation';

class AccountButton extends React.Component {
  constructor() {
    super();
    this.state = {
      active: ''
    };
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
      <div
        className={`menu-item ${this.props.userData.isAuthed ? 'account flexed' : 'hidden'}`}
        id="list"
        role="button"
        tabIndex="-1"
        onKeyPress={undefined}
        onClick={e => {
          if (!localStorage.getItem('userData')) {
            pageNavigator(e, this.props.page, 'about', false);
            store.dispatch({ type: 'userData', value: '' });
            store.dispatch({ type: 'error', value: true });
            return;
          }
          this.addActiveClass(e);
        }}
        onBlur={() => {
          setTimeout(() => {
            this.setState({ active: '' });

          }, 300);
        }}
      >
        <div
          className="account-image"
          style={{
            backgroundImage: `url(${this.props.userData.info.image})`,
            backgroundSize: 'contain'
          }}
        />
        <span className="account-button">{this.props.userData.info.name}</span>
        <i className="fas fa-sort-down" />
        <ul className={`dropdown ${this.state.active === 'list' ? 'active flexed' : 'hidden'}`}>
          <li className={`list top ${this.state.active === 'list' ? 'flexed' : 'hidden'}`}>
            <Link
              to={`/user/${this.props.userData.info.id}`}
              id={`/user/${this.props.userData.info.id}`}
              className="account-item"
              onClick={e => pageNavigator(e, this.props.page, `user/${this.props.userData.info.id}`, this.props.userData.isAuthed)}
            >
              My Galery
            </Link>
          </li>
          <li className={`list bottom ${this.state.active === 'list' ? 'flexed' : 'hidden'}`}>
            <Link
              to="/"
              id="logout"
              className="account-item"
              onClick={e => {
                if (window.confirm('Are you sure you want to leave?') === true) {
                  pageNavigator(e, this.props.page, 'about', this.props.userData.isAuthed)
                  signOut();
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
    );
  }
}

AccountButton.propTypes = {
  userData: PropTypes.object.isRequired,
  page: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  userData: state.userData,
  page: state.page
});

export default connect(mapStateToProps)(AccountButton);
