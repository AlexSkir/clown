import React from 'react';
import $ from 'jquery';
// import { Route, Link } from 'react-router-dom';
import './user.css';
import { user, preview, settings } from '../../store/store';

let name;
let img;
user.subscribe(() => {
  name = user.getState().name;
  img = user.getState().imageURL;
});
let gif;
let frames;
let piskelID;
preview.subscribe(() => {
  gif = preview.getState().gif;
  frames = preview.getState().frames;
  piskelID = preview.getState().piskelID;
});
let title;
settings.subscribe(() => {
  title = settings.getState().title;
});

const projects = {
  project1: {
    id: piskelID,
    gif,
    frames
  }
};
const projectsJson = JSON.stringify(projects);
localStorage.setItem('myProjects', projectsJson);
$(document).ready(() => {
  const returnProjects = JSON.parse(localStorage.getItem('myProjects'));
});

class User extends React.Component {
  constructor() {
    super();
    this.state = {
      img: '',
      name: '',
      height: '',
      isEmpty: true,
      gif: '',
      frames: [],
      title: ''
    };
    this.mounted = false;
  }

  componentWillMount() {
    this.setState({ height: window.innerHeight, img, name });
    if (gif && frames) {
      this.setState({ isEmpty: false, gif, frames, title });
      localStorage.setItem('isEmpty', false);
      localStorage.setItem('gif', gif);
      localStorage.setItem('frames', frames);
      localStorage.setItem('title', title);
    }
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  adoptGif() {
    if (this.state.color.gif === '') {
      this.setState({ isEmpty: false, gif });
    }
  }

  render() {
    return (
      <div className="user-page" style={{ height: this.state.height - 110 }}>
        <div
          className="user-image"
          style={{
            backgroundImage: `url(${this.state.img})`,
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
        <div id="user-piskel-preview-area" className="user-piskel-preview-area">
          <span className={`${this.state.isEmpty ? '' : 'hidden'}`}>
            No piskel available in &#39;all&#39; category.
          </span>
          <div className={`user-preview-piskel-block ${this.state.isEmpty ? 'hidden' : 'flexed'}`}>
            <div className="preview-wrapper">
              <img className="preview-gif" src={this.state.gif} alt="preview" />
              <span className="preview-gif-title">{this.state.title}</span>
              <div id="user-piskel-hidden" className="hidden">
                {this.state.frames.map(item => (
                  <img key={item} src={item} alt="img" />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="hidden">
          <button id="userAddPiskel" type="button" onClick={() => this.adoptGif()} />
        </div>
      </div>
    );
  }
}

export default User;
