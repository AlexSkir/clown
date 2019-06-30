import React from 'react';
import $ from 'jquery';
import './palettes.css';
import { palette, store } from '../../../store/store';

let newColor;
palette.subscribe(() => {
  newColor = palette.getState().addColor;
});

class Palettes extends React.Component {
  constructor() {
    super();
    this.state = {
      hovered: '',
      mouseEnter: false,
      color: [],
      changed: false,
      active: ''
    };
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

  addNewColor() {
    if (this.state.color.indexOf(newColor) === -1) {
      this.state.color.push(newColor);
      this.setState({ changed: true, active: newColor });
    }
  }

  changeCurColor(e) {
    const color = $(e.target).css('background-color');
    this.setState({ active: color });
    $('#currentColor').css({ background: color });
    store.dispatch({ type: 'currentColor', value: color });
    $('#switchHexValue').click();
  }

  render() {
    return (
      <div
        className="palettes-box"
        onMouseOver={e => this.popHintOnMouseOver(e)}
        onFocus={() => undefined}
      >
        <div className="palettes-outlet">
          <span className="palettes-title">Palettes</span>
        </div>
        <div className="palettes-buttons-box">
          <button
            type="button"
            className="palettes-button"
            onMouseEnter={() => this.mouseIn()}
            onMouseLeave={() => this.mouseOut()}
          >
            <i id="palettes-plus" className="fas fa-plus" />
          </button>
          <button type="button" id="palettes-dropdown-list" className="palettes-button colors-list">
            Current colors
            <i
              className={`colors-list-arrow fas fa-sort-down ${
                this.state.hovered === 'palettes-dropdown-list' ? 'colors-list-arrow-hovered' : ''
              }`}
            />
          </button>
          <button
            type="button"
            className="palettes-button"
            onMouseEnter={() => this.mouseIn()}
            onMouseLeave={() => this.mouseOut()}
          >
            <i id="palettes-edit" className="fas fa-pen" />
          </button>
          <p
            className={`hint palettes-plus ${
              this.state.mouseEnter === true && this.state.hovered === 'palettes-plus'
                ? ''
                : 'hidden'
            }`}
          >
            Create a new palette
            <i className="palettes-plus-arrow fas fa-sort-down" />
          </p>
          <p
            className={`hint palettes-edit ${
              this.state.mouseEnter === true && this.state.hovered === 'palettes-edit'
                ? ''
                : 'hidden'
            }`}
          >
            Palette options
            <i className="palettes-edit-arrow fas fa-sort-down" />
          </p>
        </div>
        <ul className="palettes-list">
          <span className={`palette-colors-isempty ${this.state.changed === true ? 'hidden' : ''}`}>
            No colors in this palette yet
          </span>
          {this.state.color.map(item => (
            <li key={item} id={item} className="palette-sample-list">
              <div
                style={{ background: item }}
                className={`palette-sample ${
                  this.state.active === item ? 'active-palette-sample' : ''
                }`}
                onClick={e => this.changeCurColor(e)}
                tabIndex="-1"
                onKeyPress={() => undefined}
                onFocus={() => undefined}
                role="button"
              />
            </li>
          ))}
        </ul>
        <button
          id="addColorButton"
          className="hidden"
          type="button"
          onClick={() => this.addNewColor()}
        />
      </div>
    );
  }
}

export default Palettes;
