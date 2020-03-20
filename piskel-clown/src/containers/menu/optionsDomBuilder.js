import React from 'react';
import PropTypes from 'prop-types';
import 'containers/menu/optionsDomBuilder.css';
import AwesomeButton from 'components/buttons/awesomeButton';
import store from 'store/store';
import Layers from 'components/menuComponents/layers-list/layers-list';
import Palettes from 'components/menuComponents/palettes/palettes';
import Settings from 'components/menuComponents/settings/settings';
import ResizeCanvas from 'components/menuComponents/resize/resizeCanvas';
import SaveOptions from 'components/menuComponents/save/save';
import ExportOptions from 'components/menuComponents/export/export';
import ImportOptions from 'components/menuComponents/import/import';

export default class Options extends React.Component {
  constructor() {
    super();
    this.state = {
      fps: 3,
      active: 'none'
    };
    this.mounted = false;
  }

  componentDidMount() {
    this.mounted = true;
    this.setState({ fps: this.props.state.project.fps });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  showOptionsOnClick(id) {
    if (this.mounted) {
      if (this.state.active === id) {
        this.setState({ active: 'none' });
      } else {
        this.setState({ active: id });
      }
    }
  }

  render() {
    return (
      <div className="optionsBox" id="optionsBox">
        <div className="fps-options">
          <span id="display-fps" className="display-fps">
            {`${this.state.fps} FPS`}
          </span>
          <input
            type="range"
            min="1"
            max="24"
            step="1"
            defaultValue={this.state.fps}
            id="fps-bar"
            className="fps-bar"
            onChange={e => {
              store.dispatch({ type: 'project', value: ['fps', e.target.value] });
              this.setState({ fps: e.target.value });
            }}
          />
        </div>
        <Layers />
        <Palettes colorSamples={this.props.state.palette} toolState={this.props.state.toolState} />
        <div className={`options-blocks-area ${this.state.active === 'none' ? '' : 'slide'}`}>
          <Settings active={this.state.active} />
          <ResizeCanvas
            active={this.state.active}
            currentCanvas={this.props.state.currentCanvas} />
          <SaveOptions
            active={this.state.active}
            state={this.props.state}
          />
          <ExportOptions
            active={this.state.active}
            state={this.props.state}
          />
          <ImportOptions active={this.state.active} />
        </div>
        <div
          className={`settings-buttons ${
            this.state.active && this.state.active === 'none' ? '' : 'slide'
            }`}
        >
          <AwesomeButton
            buttonClass="settings-button"
            onClickHandler={() => this.showOptionsOnClick('settings')}
            iconClass="fas fa-cog"
            active={this.state.active}
            buttonId="settings"
            title="Settings"
            placement="left"
          />
          <AwesomeButton
            buttonClass="settings-button"
            onClickHandler={() => this.showOptionsOnClick('resize-settings')}
            iconClass="fas fa-crop"
            active={this.state.active}
            buttonId="resize-settings"
            title="Resize the drawing area"
            placement="left"
          />
          <AwesomeButton
            buttonClass="settings-button"
            onClickHandler={() => this.showOptionsOnClick('save-settings')}
            iconClass="fas fa-save"
            active={this.state.active}
            buttonId="save-settings"
            title="Save to your galery"
            placement="left"
          />
          <AwesomeButton
            buttonClass="settings-button"
            onClickHandler={() => this.showOptionsOnClick('export-settings')}
            iconClass="fas fa-file-download"
            active={this.state.active}
            buttonId="export-settings"
            title="Export as image or animated gif"
            placement="left"
          />
          <AwesomeButton
            buttonClass="settings-button"
            onClickHandler={() => this.showOptionsOnClick('import-settings')}
            iconClass="fas fa-file-upload"
            active={this.state.active}
            buttonId="import-settings"
            title="Import your animation"
            placement="left"
          />
        </div>
      </div>
    );
  }
}

Options.propTypes = {
  state: PropTypes.object.isRequired
}
