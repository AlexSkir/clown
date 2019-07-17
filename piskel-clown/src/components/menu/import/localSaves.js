import React from 'react';
import $ from 'jquery';
import './import.css';

class LocalSaves extends React.Component {
  constructor() {
    super();
    this.state = {
      projects: []
    };
    this.changedProjects = '';
  }

  componentWillMount() {
    if (localStorage.getItem('localProjects')) {
      const obj = JSON.parse(localStorage.getItem('localProjects'));
      this.setState({ projects: Object.entries(obj) });
    }
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  deletePiskel(item) {
    for (let i = 0; i < this.state.projects.length; i += 1) {
      if (this.state.projects[i][0] === item) {
        this.state.projects.splice(i, 1);
      }
    }

    this.changedProjects = this.state.projects;
    window.localProjects = {};
    for (let k = 0; k < this.changedProjects.length; k += 1) {
      window.localProjects[this.changedProjects[k][0]] = this.changedProjects[k][1];
    }
    this.setState({ projects: this.changedProjects });
    const projectsJson = JSON.stringify(window.localProjects);
    localStorage.setItem('localProjects', projectsJson);
  }

  addPiskel() {
    if (localStorage.getItem('localProjects')) {
      const obj = JSON.parse(localStorage.getItem('localProjects'));
      const sorted = Object.entries(obj).sort((a, b) => b[1].time - a[1].time);
      this.setState({ projects: sorted });
    }
  }

  render() {
    return (
      <div className="local-saves-block">
        <div>
          <span className="local-saves-title">Browse local piskels</span>
          <i
            className="far fa-window-close local-saves-button"
            onClick={() => $('#hideSavesButton').click()}
            onKeyPress={undefined}
            tabIndex="-1"
            role="button"
          />
        </div>
        <div className="table-wrapper">
          <table className="table-local-saves" cellPadding="10" cellSpacing="20">
            <thead>
              <tr>
                <th className="table-title">Name</th>
                <th className="table-title">Date</th>
                <th className="table-title">Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.projects.map(item => (
                <tr key={item[0]}>
                  <td key={item[1].title} className="table-data">
                    {item[1].title}
                  </td>
                  <td key={item[1].date} className="table-data">
                    {item[1].date}
                  </td>
                  <td key={`${item[0]}-buttons`} className="table-data table-data-buttons">
                    <button key={`${item[0]}-load`} type="button" className="table-button">
                      Load
                    </button>
                    <button
                      key={`${item[0]}-delete`}
                      type="button"
                      className="table-button"
                      onClick={() => this.deletePiskel(item[0])}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          id="addLocalPiskel"
          type="button"
          className="hidden"
          onClick={() => this.addPiskel()}
        />
      </div>
    );
  }
}

export default LocalSaves;
