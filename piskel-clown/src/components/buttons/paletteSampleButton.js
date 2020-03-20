import React from 'react';
import PropTypes from 'prop-types';

export default class SampleButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <button
        type="button"
        style={{ background: this.props.color }}
        className={`palette-sample ${
          this.props.state === this.props.color ? 'active-palette-sample' : ''
          }`}
        onClick={this.props.onClickHandler}
      />
    );
  }
}

SampleButton.propTypes = {
  color: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  onClickHandler: PropTypes.func.isRequired
};
