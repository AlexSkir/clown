import React from 'react';
import './palettes.css';

class Palettes extends React.Component {
  constructor() {
    super();
    this.state = {
      hovered: '',
      mouseEnter: false
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
          <span className="palette-colors-isempty">No colors in this palette yet</span>
        </ul>
      </div>
    );
  }
}

export default Palettes;
