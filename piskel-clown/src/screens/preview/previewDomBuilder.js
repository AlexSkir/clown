import React from 'react';
import './preview.css';
import { fullSizePreview } from './preview';

class Preview extends React.Component {
  constructor() {
    super();
    this.state = {
      active: ''
    };
  }

  hoverIn() {
    this.setState({ active: true });
  }

  hoverOut() {
    this.setState({ active: false });
  }

  render() {
    return (
      <div
        id="preview-area"
        className="preview-area"
        onMouseEnter={() => this.hoverIn()}
        onMouseLeave={() => this.hoverOut()}
      >
        <div
          className={`preview-open ${this.state.active ? '' : 'hidden'}`}
          id="preview-open"
          role="button"
          tabIndex="-1"
          onKeyPress={undefined}
          onClick={fullSizePreview} // open animation in full size mode
        >
          <i className="fas fa-external-link-alt" />
        </div>
        <div className="preview" />
      </div>
    );
  }
}

export default Preview;
