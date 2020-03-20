import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'containers/pages/projectPage/project.css';

function ProjectInfo(props) {
  return (
    <div className="project-section">
      <div className="project-wrapper">
        <div className="piskel-page-gif-wrapper">
          <img src={props.project.gif} alt="preview-gif" />
        </div>
        <div className="piskel-page-info-wrapper">
          <span className="sprite-info-title bold">
            Title
              </span>
          <h3 className="sprite-title">
            {props.project.title}
          </h3>
          <span className="sprite-info-title bold">
            Description
              </span>
          <h3 className="sprite-description">
            {`${props.project.description || 'no-description yet'}`}
          </h3>
          <span className="sprite-info-title bold">
            Created:
              </span>
          <h3 className="sprite-date bold">
            {props.project.date}
          </h3>
          <div>
            <span className="sprite-info-title bold">
              Animation info:
                </span>
            <h3 className="sprite-options bold">
              Frames:
                </h3>
            <span>{props.project.frames.length ? props.project.frames.length : 0}</span>
            <h3 className="sprite-options bold">
              FPS:
                </h3>
            <span>
              {`${props.project.frames.length && props.project.frames.length === 1
                ? 0
                : props.project.fps} frames per second`}
            </span>
            <h3 className="sprite-options bold">
              The total duration:
                </h3>
            <span>
              {`${(props.project.frames.length && props.project.frames.length === 1
                ? 0
                : props.project.frames.length / props.project.fps
              ).toFixed(1)} seconds`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

ProjectInfo.propTypes = {
  project: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  project: state.project
});

export default connect(mapStateToProps)(ProjectInfo);