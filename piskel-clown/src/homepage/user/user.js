import React from 'react';
// import { Route, Link } from 'react-router-dom';
import './user.css';
import store from '../../store/store';

// let name;
// let img;
// store.subscribe(() => {
//   name = store.getState().name;
//   img = store.getState().imageURL;
//   console.log(name);
// });

class User extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      height: ''
    };
    this.mounted = false;
  }

  componentWillMount() {
    this.setState({ height: window.innerHeight });
  }

  componentDidMount() {
    this.mounted = true;
    this.setState({ name: store.getState().name });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (
      <div className="user-page" style={{ height: this.state.height - 110 }}>
        <div
          className="user-image"
          style={{
            backgroundImage: `url(${store.getState().imageURL})`,
            backgroundSize: 'contain'
          }}
        />
        <h2 className="user-name">{this.state.name}</h2>
        <ul className="piskel-list">
          <li>all</li>
          <li>public</li>
          <li>private</li>
          <li>deleted</li>
        </ul>
        <span>No piskel available in &#39;all&#39; category.</span>
      </div>
    );
  }
}

export default User;
