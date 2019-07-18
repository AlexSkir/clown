import React from 'react';
import './project.css';

class Piskel extends React.Component {
  constructor() {
    super();
    this.state = {
      projectInfo: []
    };
    this.changedProjects = '';
    this.localObj = {};
    this.mounted = false;
    this.user = '';
    this.project = '';
  }

  componentWillMount() {
    this.user = localStorage.getItem('userID');
    this.project = localStorage.getItem('project');
  }

  componentDidMount() {
    if (localStorage.getItem(`${this.user}`)) {
      const obj = JSON.parse(localStorage.getItem(`${this.user}`));
      const entries = Object.entries(obj);
      this.localObj = entries.filter(projects => projects[0] === this.project);
      this.setState({ projectInfo: this.localObj });
    }
  }

  render() {
    return (
      <div className="project-section">
        {this.state.projectInfo.map(item => (
          <div key={`${item[0]}-project-wrapper`} className="project-wrapper">
            <div key={`${item[0]}-gif-wrapper`} className="piskel-page-gif-wrapper">
              <img key={item[1].gif} src={item[1].gif} alt="preview-gif" />
            </div>
            <div key={`${item[0]}-info-wrapper`} className="piskel-page-info-wrapper">
              <span className="sprite-info-title bold" key={`${item[0]}-title`}>
                Title
              </span>
              <h3 className="sprite-title" key={item[1].title}>
                {item[1].title}
              </h3>
              <span className="sprite-info-title bold" key={`${item[0]}-description`}>
                Description
              </span>
              <h3 className="sprite-description" key={item[1].description}>
                {`${item[1].description || 'no-description yet'}`}
              </h3>
              <span className="sprite-info-title bold" key={`${item[0]}-date`}>
                Created:
              </span>
              <h3 className="sprite-date bold" key={item[1].date}>
                {item[1].date}
              </h3>
              <div key={`${item[0]}-options-wrapper`}>
                <span className="sprite-info-title bold" key={`${item[0]}-options`}>
                  Animation info:
                </span>
                <h3 className="sprite-options bold" key={`${item[0]}-frames-length`}>
                  Frames:
                </h3>
                <span key={`${item[0]}-frames-span`}>{`${item[1].frames.length}`}</span>
                <h3 className="sprite-options bold" key={`${item[0]}-fps`}>
                  FPS:
                </h3>
                <span key={`${item[0]}-fps-span`}>
                  {`${item[1].frames.length === 1 ? 0 : item[1].fps} frames per second`}
                </span>
                <h3 className="sprite-options bold" key={`${item[0]}-time`}>
                  The total duration:
                </h3>
                <span key={`${item[0]}-duration-span`}>
                  {`${(item[1].frames.length === 1
                    ? 0
                    : item[1].frames.length / item[1].fps
                  ).toFixed(1)} seconds`}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Piskel;
