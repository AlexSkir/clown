import React from 'react';
import './layers-list.css';

class Layers extends React.Component {
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
        className="layers-box"
        onMouseOver={e => this.popHintOnMouseOver(e)}
        onFocus={() => undefined}
      >
        <div className="layer-outlet">
          <span className="layer-title">Layers</span>
          <i
            id="layers-preview"
            className="fas fa-eye"
            onMouseEnter={() => this.mouseIn()}
            onMouseLeave={() => this.mouseOut()}
          />
          <p
            className={`hint layers-preview ${
              this.state.hovered === 'layers-preview' ? '' : 'hidden'
            }`}
          >
            Preview all layers
            <i className="layers-preview-arrow fas fa-sort-down" />
          </p>
        </div>
        <div className="layer-buttons-box">
          <button
            type="button"
            className="layer-button"
            onMouseEnter={() => this.mouseIn()}
            onMouseLeave={() => this.mouseOut()}
          >
            <i id="layers-plus" className="fas fa-plus" />
          </button>
          <button
            type="button"
            className="layer-button"
            onMouseEnter={() => this.mouseIn()}
            onMouseLeave={() => this.mouseOut()}
          >
            <i id="layers-up" className="fas fa-arrow-up" />
          </button>
          <button
            type="button"
            className="layer-button"
            onMouseEnter={() => this.mouseIn()}
            onMouseLeave={() => this.mouseOut()}
          >
            <i id="layers-down" className="fas fa-arrow-down" />
          </button>
          <button
            type="button"
            className="layer-button"
            onMouseEnter={() => this.mouseIn()}
            onMouseLeave={() => this.mouseOut()}
          >
            <i id="layers-edit-name" className="fas fa-pen" />
          </button>
          <button
            type="button"
            className="layer-button"
            onMouseEnter={() => this.mouseIn()}
            onMouseLeave={() => this.mouseOut()}
          >
            <i id="layers-merge" className="fas fa-compress" />
          </button>
          <button
            type="button"
            className="layer-button"
            onMouseEnter={() => this.mouseIn()}
            onMouseLeave={() => this.mouseOut()}
          >
            <i id="layers-remove" className="fas fa-times" />
          </button>
          <p
            className={`hint layers-plus ${
              this.state.mouseEnter === true && this.state.hovered === 'layers-plus' ? '' : 'hidden'
            }`}
          >
            Create a layer
            <i className="layers-plus-arrow fas fa-sort-down" />
          </p>
          <p
            className={`hint layers-up ${
              this.state.mouseEnter === true && this.state.hovered === 'layers-up' ? '' : 'hidden'
            }`}
          >
            Move layer up
            <i className="layers-up-arrow fas fa-sort-down" />
          </p>
          <p
            className={`hint layers-down ${
              this.state.mouseEnter === true && this.state.hovered === 'layers-down' ? '' : 'hidden'
            }`}
          >
            Move layer down
            <i className="layers-down-arrow fas fa-sort-down" />
          </p>
          <p
            className={`hint layers-edit-name ${
              this.state.mouseEnter === true && this.state.hovered === 'layers-edit-name'
                ? ''
                : 'hidden'
            }`}
          >
            Edit layer name
            <i className="layers-edit-name-arrow fas fa-sort-down" />
          </p>
          <p
            className={`big hint layers-merge ${
              this.state.mouseEnter === true && this.state.hovered === 'layers-merge'
                ? ''
                : 'hidden'
            }`}
          >
            Merge with layer below
            <i className="layers-merge-arrow fas fa-sort-down" />
          </p>
          <p
            className={`big hint layers-remove ${
              this.state.mouseEnter === true && this.state.hovered === 'layers-remove'
                ? ''
                : 'hidden'
            }`}
          >
            Delete selected layer
            <i className="layers-remove-arrow fas fa-sort-down" />
          </p>
        </div>
        <ul className="layer-list">
          <li className="layer-item">Layer 1</li>
        </ul>
      </div>
    );
  }
}

export default Layers;
