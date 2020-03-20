import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import 'components/tools/tools.css';
import toolButtonsClickHandler from 'components/functions/toolsFunctions/buttonsClickHandlers';
import store from 'store/store';
import AwesomeButton from 'components/buttons/awesomeButton';

export default class ToolsPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      active: ''
    };
    this.mounted = false;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  activeToolSetter(tool) {
    if (this.state.active === tool) {
      this.setState({ active: null });
      store.dispatch({ type: 'toolState', value: ['currentTool', ''] });
      toolButtonsClickHandler(null);
    } else {
      this.setState({ active: tool });
      store.dispatch({ type: 'toolState', value: ['currentTool', tool] });
      toolButtonsClickHandler(tool);
    }
  }

  render() {
    return (
      <div name="Tools">
        <div className="tool-panel" id="tool-panel">
          <div className="tool-buttons-block">
            <AwesomeButton
              buttonId="paintBucketTool"
              buttonClass="tool-button"
              onClickHandler={() => this.activeToolSetter('paintBucketTool')}
              iconClass="fas fa-fill-drip"
              active={this.state.active}
              title="Click on the area to paint it in chosen color"
              placement="right"
            />
            <AwesomeButton
              buttonId="colorPickerTool"
              buttonClass="tool-button"
              onClickHandler={() => this.activeToolSetter('colorPickerTool')}
              iconClass="fas fa-eye-dropper"
              active={this.state.active}
              title="Click on any fragment to pick its color"
              placement="right"
            />
            <AwesomeButton
              buttonId="penTool"
              buttonClass="tool-button"
              onClickHandler={() => this.activeToolSetter('penTool')}
              iconClass="fas fa-pencil-alt"
              active={this.state.active}
              title="Click and move the mouse to draw"
              placement="right"
            />
            <AwesomeButton
              buttonId="eraserTool"
              buttonClass="tool-button"
              onClickHandler={() => this.activeToolSetter('eraserTool')}
              iconClass="fas fa-eraser"
              active={this.state.active}
              title="Click on the area to erase it"
              placement="right"
            />
            <AwesomeButton
              buttonId="strokeTool"
              buttonClass="tool-button"
              onClickHandler={() => this.activeToolSetter('strokeTool')}
              iconClass="fas fa-slash"
              active={this.state.active}
              title="Click and move the mouse to draw a line"
              placement="right"
            />
            <AwesomeButton
              buttonId="rectangleTool"
              buttonClass="tool-button"
              onClickHandler={() => this.activeToolSetter('rectangleTool')}
              iconClass="far fa-square"
              active={this.state.active}
              title="Click and move the mouse to draw a rectangle"
              placement="right"
            />
            <AwesomeButton
              buttonId="circleTool"
              buttonClass="tool-button"
              onClickHandler={() => this.activeToolSetter('circleTool')}
              iconClass="far fa-circle"
              active={this.state.active}
              title="Click and move the mouse to draw a circle"
              placement="right"
            />
          </div>
        </div>

        <div className="color-panel">
          <AwesomeButton
            buttonClass="color-switcher"
            onClickHandler={() => {
              const current = this.props.toolState.currentColor;
              const back = this.props.toolState.backColor;
              store.dispatch({ type: 'toolState', value: ['currentColor', back] });
              store.dispatch({ type: 'toolState', value: ['backColor', current] });
            }}
            iconClass="fas fa-retweet"
            title="Switch colors on click"
            placement="bottom-start"
            buttonId={null}
            active={this.state.active}
          />
          <div className="color-block-upper">
            <input
              type="color"
              name="colors"
              className="input-color"
              id="customed1"
              defaultValue={this.props.toolState.currentColor}
              onChange={e => store.dispatch({ type: 'toolState', value: ['currentColor', $(e.target).val()] })}
            />
          </div>
          <div className="color-block-under">
            <input
              type="color"
              name="colors"
              className="input-color"
              id="customed2"
              defaultValue={this.props.toolState.backColor}
              onChange={e => store.dispatch({ type: 'toolState', value: ['backColor', $(e.target).val()] })}
            />
          </div>
        </div>
      </div>
    );
  }
}

ToolsPanel.propTypes = {
  toolState: PropTypes.object.isRequired
};
