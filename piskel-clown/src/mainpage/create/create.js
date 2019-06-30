import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import $ from 'jquery';
import Tools from '../../components/tools/toolsDomBuilder';
import Canvas from '../../screens/canvas/canvasDomBuilder';
import Frames from '../../components/frames-list/frameDomBuilder';
import Preview from '../../screens/preview/previewDomBuilder';
import Options from '../../components/menu/optionsDomBuilder';

class CreateAnimation extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    $(window).bind('beforeunload', () => {
      localStorage.setItem('page', '');
      const url = 'https://alexskir.github.io/clown/piskel-clown/build/';
      console.log(url);
      $(window.location).attr('href', url);
      return 'are you sure you want to leave?';
    });
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
        </div>
        {/* <Switch>
          <Route path="/clown/piskel-clown/build/" exact component={About} />
          <Redirect from="/clown/piskel-clown/build/create" to="/clown/piskel-clown/build/" />
          <Route path={`/clown/piskel-clown/build/user/${this.state.id}`} component={User} />
          <Route path="/clown/piskel-clown/build/create-animation" component={CreateAnimation} />
          <Route component={About} />
        </Switch> */}
      </div>
    );
  }
}

export default CreateAnimation;
