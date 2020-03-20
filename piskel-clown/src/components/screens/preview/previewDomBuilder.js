import React from 'react';
import PropTypes from 'prop-types';
import 'components/screens/preview/preview.css';
import { fullSizePreview } from 'components/functions/preview';

export default class PreviewBlock extends React.Component {
  constructor() {
    super();
    this.state = {
      active: ''
    };
  }

  hoverIn() {
    if (this.mounted) {
      this.setState({ active: true });
    }
  }

  hoverOut() {
    if (this.mounted) {
      this.setState({ active: false });
    }
  }

  render() {
    return (
      <div
        id="preview-area"
        className="preview-area"
        onMouseEnter={() => this.hoverIn()}
        onMouseLeave={() => this.hoverOut()}
      >
        <div className="preview">
          {this.props.framesArray.map(item => (
            <img
              key={`image${item.id}`}
              id={`imagePreview${item.id}`}
              src={item.frameSRC}
              style={{ width: '100%' }}
              alt=""
            />
          ))}
        </div>
        <div
          className={`preview-open ${this.state.active ? '' : 'hidden'}`}
          id="preview-open"
          role="button"
          tabIndex="-1"
          onKeyPress={undefined}
          onClick={fullSizePreview}
        >
          <i className="fas fa-external-link-alt" />
        </div>
      </div>
    );
  }
}

PreviewBlock.propTypes = {
  framesArray: PropTypes.array.isRequired
};