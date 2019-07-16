import React from 'react';
import $ from 'jquery';
import Tools from '../../components/tools/toolsDomBuilder';
import Canvas from '../../screens/canvas/canvasDomBuilder';
import Frames from '../../components/frames-list/frameDomBuilder';
import Preview from '../../screens/preview/previewDomBuilder';
import Options from '../../components/menu/optionsDomBuilder';
import LocalSaves from '../../components/menu/import/localSaves';

class CreateAnimation extends React.Component {
  constructor() {
    super();
    this.state = {
      showSaves: false
    };
  }

  componentDidMount() {
    $(window).bind('beforeunload', () => {
      return 'are you sure you want to leave?';
    });
  }

  render() {
    return (
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
        <div className={`local-saves-page ${this.state.showSaves ? '' : 'hidden'}`}>
          <div className="local-saves-background" />
          <LocalSaves />
        </div>

        <button
          type="button"
          className="hidden"
          id="showSavesButton"
          onClick={() => this.setState({ showSaves: true })}
        />
        <button
          type="button"
          className="hidden"
          id="hideSavesButton"
          onClick={() => this.setState({ showSaves: false })}
        />
      </div>
    );
  }
}

export default CreateAnimation;
