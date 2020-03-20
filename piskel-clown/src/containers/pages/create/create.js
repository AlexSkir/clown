import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import $ from 'jquery';
import ToolsPanel from 'components/tools/toolsDomBuilder';
import FramesWrapper from 'components/screens/frames/frameDomBuilder';
import CanvasWrapper from 'components/screens/canvas/canvasDomBuilder';
import PreviewBlock from 'components/screens/preview/previewDomBuilder';
import Options from 'containers/menu/optionsDomBuilder';
import LocalSaves from 'containers/pages/localSaves/localSaves';
import 'containers/pages/create/create.css';
import store from 'store/store';

class CreateAnimation extends React.Component {
  constructor() {
    super();
    this.state = {
      showSaves: false,
      size: '',
      changeWidth: ''
    };
    this.mounted = false;
  }

  componentWillMount() {
    const canvasWidth =
      window.innerWidth - 500 < window.innerHeight - 155
        ? window.innerWidth - 500
        : window.innerHeight - 155;
    this.setState({ size: canvasWidth > 350 ? canvasWidth : 350, changeWidth: canvasWidth });
  }

  componentDidMount() {
    this.mounted = true;
    $(window).bind('beforeunload', () => 'are you sure you want to leave?');
    $(window).bind('resize', () => {
      const changeWidth =
        window.innerWidth - 500 < window.innerHeight - 155
          ? window.innerWidth - 500
          : window.innerHeight - 155;
      this.setState({ changeWidth });
    });
  }

  componentWillUnmount() {
    this.mounted = false;
    store.dispatch({ type: 'project', value: 'initial' });
  }

  render() {
    return (
      <div id="container" className="create-page-wrapper">
        <section className="tool-pannel" id="tool-pannel">
          <ToolsPanel toolState={this.props.state.toolState} />
        </section>
        <section className="frame-area" id="frame-area">
          <FramesWrapper
            framesArray={this.props.state.framesArray}
            bg={this.props.state.settings.currentBG}
          />
        </section>
        <section
          className="canvas-area"
          id="canvas-area"
          style={{ overflow: `${this.state.size > this.state.changeWidth ? 'scroll' : ''}` }}
        >
          <CanvasWrapper
            currentCanvas={this.props.state.currentCanvas}
            toolState={this.props.state.toolState}
            settings={this.props.state.settings}
            framesArray={this.props.state.framesArray} />
        </section>
        <div className="right-side-panel">
          <section className="preview-area noselect" id="preview-area">
            <PreviewBlock
              framesArray={this.props.state.framesArray}
            />
          </section>
          <section className="options-area" id="options-area">
            <Options state={this.props.state} />
          </section>
        </div>
        <div className={`local-saves-page ${this.mounted && this.props.state.showLocalSaves ? '' : 'hidden'}`}>
          <div className="local-saves-background" />
          <LocalSaves localProjects={this.props.state.localProjects} />
        </div>
      </div>
    );
  }
}

CreateAnimation.propTypes = {
  state: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  state: state
});

export default connect(mapStateToProps)(CreateAnimation);
