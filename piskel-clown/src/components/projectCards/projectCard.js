import React from 'react';
import PropTypes from 'prop-types';
import 'components/projectCards/projectCard.css';
import AwesomeButton from 'components/buttons/awesomeButton';

export default class ProjectCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: ''
    };
  }

  hoverIn(e) {
    this.setState({ active: e.currentTarget.id });
  }

  hoverOut() {
    this.setState({ active: false });
  }

  render() {
    return (
      <div
        className="preview-wrapper"
        id={this.props.infoObj[0]}
        onMouseEnter={e => this.hoverIn(e)}
        onMouseLeave={() => this.hoverOut()}
      >
        <img className="preview-gif" src={this.props.infoObj[1].gif} alt="preview" />
        <span className="preview-gif-title">
          {this.props.infoObj[1].title}
        </span>
        <span className="preview-gif-date">
          {this.props.infoObj[1].date}
        </span>
        <div className={`piskel-preview-button-block ${
          this.state.active === this.props.infoObj[0] ? '' : 'hidden'
          }`}>
          <AwesomeButton
            buttonClass='piskel-preview-button'
            onClickHandler={() => this.props.deletePiskelOnClick(this.props.infoObj[0])}
            iconClass='fas fa-trash-alt'
            title='Delete piskel'
            placement='bottom'
          />
          <AwesomeButton
            buttonClass='piskel-preview-button'
            onClickHandler={() =>
              this.props.onClickHandler(this.props.infoObj[0], this.props.infoObj[1].frames, this.props.infoObj[1])}
            iconClass='fas fa-pencil-alt'
            title='Edit piskel'
            placement='bottom'
          />
          <AwesomeButton
            buttonClass='piskel-preview-button'
            onClickHandler={() =>
              this.props.onClickHandler(false, this.props.infoObj[1].frames, this.props.infoObj[1])}
            iconClass='fas fa-copy'
            title='Copy piskel'
            placement='bottom'
          />
          <AwesomeButton
            buttonClass='piskel-preview-button'
            onClickHandler={() => this.props.onClickHandler(this.props.infoObj[0], false, this.props.infoObj)}
            iconClass='fas fa-eye'
            title='Preview piskel details'
            placement='bottom'
          />
        </div>
      </div>
    );
  }
}

ProjectCard.propTypes = {
  onClickHandler: PropTypes.func.isRequired,
  deletePiskelOnClick: PropTypes.func.isRequired,
  infoObj: PropTypes.array.isRequired,
  isAuthed: PropTypes.bool.isRequired
};
