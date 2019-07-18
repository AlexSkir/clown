import React from 'react';
import $ from 'jquery';
import './menu.css';
import { store, options } from '../../store/store';
import Layers from './layers-list/layers-list';
import Palettes from './palettes/palettes';
import Settings from './settings/settings';
import ResizeCanvas from './resize/resizeCanvas';
import SaveOptions from './save/save';
import ExportOptions from './export/export';
import ImportOptions from './import/import';

let fps;
store.subscribe(() => {
  fps = store.getState().fps;
});
class Options extends React.Component {
  constructor() {
    super();
    this.state = {
      fps: 3,
      hovered: '',
      active: 'none',
      mouseEnter: false
    };
    this.mounted = false;
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
    this.setState({
      fps: 3,
      hovered: '',
      active: 'none',
      mouseEnter: false
    });
  }

  fpsOnChangeHandler() {
    store.dispatch({ type: 'fps', value: $('#fps-bar').val() });
    this.setState({ fps });
  }

  popHintOnMouseOver(e) {
    const hovered = e.target.getAttribute('id');
    if (this.state.hovered === hovered) {
      this.setState({ hovered: '' });
    } else {
      this.setState({ hovered });
    }
  }

  mouseIn() {
    this.setState({ mouseEnter: true });
  }

  mouseOut() {
    this.setState({ mouseEnter: false });
  }

  showOptionsOnClick(e) {
    const clicked =
      $(e.target).attr('id') ||
      $(e.target)
        .find('i')
        .attr('id');
    if (this.state.active === clicked) {
      this.setState({ active: 'none' });
      options.dispatch({ type: 'optionsBlock', value: 'none' });
    } else {
      this.setState({ active: clicked });
      options.dispatch({ type: 'optionsBlock', value: clicked });
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
            onChange={() => this.fpsOnChangeHandler()}
          />
        </div>
        <Layers />
        <Palettes />
        <div className={`options-blocks-area ${this.state.active === 'none' ? '' : 'slide'}`}>
          <Settings />
          <ResizeCanvas />
          <SaveOptions />
          <ExportOptions />
          <ImportOptions />
        </div>
        <div
          className={`settings-buttons ${this.state.active === 'none' ? '' : 'slide'}`}
          onMouseOver={e => this.popHintOnMouseOver(e)}
          onFocus={() => undefined}
        >
          <button
            type="button"
            className="settings-button"
            onFocus={() => undefined}
            onClick={e => this.showOptionsOnClick(e)}
            onMouseEnter={() => this.mouseIn()}
            onMouseLeave={() => this.mouseOut()}
          >
            <i
              id="settings"
              className={`fas fa-cog ${this.state.hovered === 'settings' ? 'fas-hovered' : ''} ${
                this.state.active === 'settings' ? 'fas-hovered' : ''
              }`}
            />
          </button>
          <button
            type="button"
            className="settings-button"
            onFocus={() => undefined}
            onClick={e => this.showOptionsOnClick(e)}
            onMouseEnter={() => this.mouseIn()}
            onMouseLeave={() => this.mouseOut()}
          >
            <i
              id="resize-settings"
              className={`fas fa-crop ${
                this.state.hovered === 'resize-settings' ? 'fas-hovered' : ''
              } ${this.state.active === 'resize-settings' ? 'fas-hovered' : ''}`}
            />
          </button>
          <button
            type="button"
            className="settings-button"
            onFocus={() => undefined}
            onClick={e => this.showOptionsOnClick(e)}
            onMouseEnter={() => this.mouseIn()}
            onMouseLeave={() => this.mouseOut()}
          >
            <i
              id="save-settings"
              className={`fas fa-save ${
                this.state.hovered === 'save-settings' ? 'fas-hovered' : ''
              } ${this.state.active === 'save-settings' ? 'fas-hovered' : ''}`}
            />
          </button>
          <button
            type="button"
            className="settings-button"
            onFocus={() => undefined}
            onClick={e => this.showOptionsOnClick(e)}
            onMouseEnter={() => this.mouseIn()}
            onMouseLeave={() => this.mouseOut()}
          >
            <i
              id="export-settings"
              className={`fas fa-file-download ${
                this.state.hovered === 'export-settings' ? 'fas-hovered' : ''
              } ${this.state.active === 'export-settings' ? 'fas-hovered' : ''}`}
            />
          </button>
          <button
            type="button"
            className="settings-button"
            onFocus={() => undefined}
            onClick={e => this.showOptionsOnClick(e)}
            onMouseEnter={() => this.mouseIn()}
            onMouseLeave={() => this.mouseOut()}
          >
            <i
              id="import-settings"
              className={`fas fa-file-upload ${
                this.state.hovered === 'import-settings' ? 'fas-hovered' : ''
              } ${this.state.active === 'import-settings' ? 'fas-hovered' : ''}`}
            />
          </button>

          <p
            className={`hint settings-button-cog ${
              this.state.mouseEnter === true && this.state.hovered === 'settings' ? '' : 'hidden'
            }`}
          >
            Settings
            <i className="settings-button-cog-arrow fas fa-caret-right" />
          </p>
          <p
            className={`big hint resize-settings ${
              this.state.mouseEnter === true && this.state.hovered === 'resize-settings'
                ? ''
                : 'hidden'
            }`}
          >
            Resize the drawing area
            <i className="resize-settings-arrow fas fa-caret-right" />
          </p>
          <p
            className={`hint save-settings ${
              this.state.mouseEnter === true && this.state.hovered === 'save-settings'
                ? ''
                : 'hidden'
            }`}
          >
            Save to your galery
            <i className="save-settings-arrow fas fa-caret-right" />
          </p>
          <p
            className={`big hint export-settings ${
              this.state.mouseEnter === true && this.state.hovered === 'export-settings'
                ? ''
                : 'hidden'
            }`}
          >
            Export as image or animated gif
            <i className="export-settings-arrow fas fa-caret-right" />
          </p>
          <p
            className={`big hint import-settings ${
              this.state.mouseEnter === true && this.state.hovered === 'import-settings'
                ? ''
                : 'hidden'
            }`}
          >
            Import your animation
            <i className="import-settings-arrow fas fa-caret-right" />
          </p>
        </div>
      </div>
    );
  }
}

export default Options;
