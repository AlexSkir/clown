/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Link, Switch } from 'react-router-dom';
import $ from 'jquery';
import Tools from '../../components/tools/toolsDomBuilder';
import Canvas from '../../screens/canvas/canvasDomBuilder';
import Frames from '../../components/frames-list/frameDomBuilder';
import Preview from '../../screens/preview/previewDomBuilder';
import Options from '../../components/menu/optionsDomBuilder';

class CreateAnimation extends React.Component {
  constructor() {
    super();
    this.state = {
      redirected: false
    };
  }

  componentDidMount() {
    $(window).bind('beforeunload', e => {
      if (confirm('Are you sure you want to leave?') === true) {
        localStorage.setItem('page', '/');
        this.setState({ redirected: true });
      } else {
        e.preventDefault();
      }
    });
  }

  isRedirected() {
    if (this.state.redirected === true) {
      return <Redirect to="/clown/piskel-clown/build/" />;
    }
  }

  render() {
    return (
      <div>
        <div id="container" className="container">
          <section className="tool-pannel" id="tool-pannel">
            <Tools />
          </section>
          <section className="frame-area" id="frame-area">
            <Frames />
          </section>
          <section className="canvas-area" id="canvas-area">
            <Canvas />
          </section>
          <section className="preview-area noselect" id="preview-area">
            <Preview />
          </section>
          <section className="options-area" id="options-area">
            <Options />
          </section>
          {this.isRedirected()}
        </div>
      </div>
    );
  }
}

export default CreateAnimation;
