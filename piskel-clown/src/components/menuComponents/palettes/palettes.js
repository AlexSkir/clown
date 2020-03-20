import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import AwesomeButton from 'components/buttons/awesomeButton';
import SampleButton from 'components/buttons/paletteSampleButton';
import 'components/menuComponents/palettes/palettes.css';
import store from 'store/store';
import { rgbToHex } from 'components/functions/colors';

class Palettes extends React.Component {
  constructor() {
    super();
    this.state = {
      hovered: '',
      mouseEnter: false,
      color: [],
      changed: false
    };
  }

  addPalettesOnClick() { }

  editPalettesOnClick() { }

  choosePalettesOnClick() { }

  changeCurColor(e) {
    const color = $(e.target).css('background-color');
    const hexColor = rgbToHex(color)
    store.dispatch({ type: 'toolState', value: ['currentColor', hexColor] });
  }

  render() {
    return (
      <div className="palettes-box">
        <div className="palettes-outlet">
          <span className="palettes-title">Palettes</span>
        </div>
        <div className="palettes-buttons-box">
          <AwesomeButton
            buttonClass="palettes-button"
            onClickHandler={() => this.addPalettesOnClick()}
            iconClass="fas fa-plus"
            active={null}
            title="Create a new palette"
            placement="top-end"
          />
          <button
            type="button"
            id="palettes-dropdown-list"
            className="palettes-button colors-list"
            onMouseEnter={() => this.setState({ hovered: true })}
            onMouseLeave={() => this.setState({ hovered: false })}
            onClick={() => this.choosePalettesOnClick()}
          >
            Current colors
            <i
              className={`colors-list-arrow fas fa-sort-down ${
                this.state.hovered ? 'colors-list-arrow-hovered' : ''
                }`}
            />
          </button>
          <AwesomeButton
            buttonClass="palettes-button"
            onClickHandler={() => this.editPalettesOnClick()}
            iconClass="fas fa-pen"
            active={null}
            title="Palette options"
            placement="top-end"
          />
        </div>
        <ul className="palettes-list">
          <span className={`palette-colors-isempty ${this.props.colorSamples.length > 0 ? 'hidden' : ''}`}>
            No colors in this palette yet
          </span>
          {this.props.colorSamples.map(item => (
            <li key={item} id={item} className="palette-sample-list">
              <SampleButton
                color={item}
                state={this.props.toolState.currentColor}
                onClickHandler={e => this.changeCurColor(e)}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

Palettes.propTypes = {
  colorSamples: PropTypes.array.isRequired,
  toolState: PropTypes.object.isRequired
}

export default Palettes;
