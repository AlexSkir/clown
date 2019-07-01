import React from 'react';
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
      localStorage.setItem('page', '/');
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
      </div>
    );
  }
}

export default CreateAnimation;
