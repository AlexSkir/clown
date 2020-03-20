import React from 'react';
import PropTypes from 'prop-types';
import CustomizedTooltips from 'components/tooltips/tooltip';

export default class AwesomeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseEnter: false
    };
  }

  mouseIn() {
    this.setState({ mouseEnter: true });
  }

  mouseOut() {
    this.setState({ mouseEnter: false });
  }

  render() {
    return (
      <CustomizedTooltips
        title={this.props.title}
        placement={this.props.placement}
        enterDelay={500}
      >
        <button
          type="button"
          className={
            `${this.props.buttonClass} ${this.state.mouseEnter || this.props.active === this.props.buttonId
              ? `${this.props.buttonClass}-hovered`
              : ''}`}
          onMouseEnter={() => this.mouseIn()}
          onMouseLeave={() => this.mouseOut()}
          onClick={() => this.props.onClickHandler()}
        >
          <i
            className={this.props.iconClass}
          />
        </button>
      </CustomizedTooltips>
    );
  }
}

AwesomeButton.propTypes = {
  buttonId: PropTypes.string,
  buttonClass: PropTypes.string,
  iconClass: PropTypes.string.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  active: PropTypes.string,
  title: PropTypes.string.isRequired,
  placement: PropTypes.string.isRequired
};

AwesomeButton.defaultProps = {
  buttonClass: 'awesome-button',
  text: ''
};
