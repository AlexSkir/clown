import React from 'react';
import { Route, HashRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from 'components/header/header';
import About from 'containers/pages/about/about';
import CreateAnimation from 'containers/pages/create/create';
import ErrorPage from 'containers/pages/error/error';
import User from 'containers/pages/user/user';
import ProjectInfo from 'containers/pages/projectPage/project';
import store from 'store/store';
import { googleAuth, onSuccessHandler } from 'services/googleAuth/authApi';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      error: false
    };
    this.onSuccess = this.onSuccess.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      googleAuth(this.onSuccess);
    }, 200);
  }

  onSuccess(googleUser) {
    const userData = onSuccessHandler(googleUser);
    store.dispatch({ type: 'userData', value: userData });
  }

  componentWillUnmount() {
    this.setState(null);
  }

  render() {
    return (
      <HashRouter>
        <Header isAuthed={this.props.userData.isAuthed} page={this.props.page} />
        <ErrorPage error={this.props.error} />
        <div className={`${this.props.error ? 'hidden' : 'page-wrapper'}`}>
          <Route path={`/${this.props.locale}/about`} component={About} />
          <Route path={`/${this.props.locale}/user/*`} component={User} />
          <Route path={`/${this.props.locale}/create-animation/*`} component={CreateAnimation} />
          <Route path={`/${this.props.locale}/projects/*`} component={ProjectInfo} />
          <Route path={`*`}>
            {this.props.locale && this.props.page !== ''
              ? this.props.page === 'user'
                ? this.props.userData.isAuthed
                  ? <Redirect to={`/${this.props.locale}/user/${this.props.userData.info.id}`} />
                  : <Redirect to={`/${this.props.locale}/about`} />
                : <Redirect to={`/${this.props.locale}/${this.props.page}`} />
              : <Redirect to={`/${this.props.locale}/about`} />}
          </Route>
        </div>
      </HashRouter>
    );
  }
}

App.propTypes = {
  locale: PropTypes.string.isRequired,
  userData: PropTypes.object.isRequired,
  page: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  project: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  locale: state.locales.locale,
  userData: state.userData,
  page: state.page,
  error: state.error,
  project: state.project
});

export default connect(mapStateToProps)(App);
