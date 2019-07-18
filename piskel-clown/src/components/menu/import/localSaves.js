import React from 'react';
import $ from 'jquery';
import { Redirect } from 'react-router-dom';
import './import.css';
import { fromDataToCanvas } from '../export/fromImageToCanvas';
import { preview, settings } from '../../../store/store';

class LocalSaves extends React.Component {
  constructor() {
    super();
    this.state = {
      projects: [],
      page: ''
    };
    this.changedProjects = '';
    this.mounted = false;
    this.project = '';
  }

  componentWillMount() {
    if (localStorage.getItem('localProjects')) {
      const obj = JSON.parse(localStorage.getItem('localProjects'));
      const sorted = Object.entries(obj).sort((a, b) => b[1].time - a[1].time);
      this.setState({ projects: sorted });
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

  isRedirected() {
    if (this.state.page) {
      this.mounted = false;
      return <Redirect to={`/create-animation/${this.project}`} />;
    }
    return <div className="hidden" />;
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
                    <button
                      key={`${item[0]}-load`}
                      type="button"
                      className="table-button"
                      onClick={() => {
                        this.project = item[0];
                        localStorage.setItem('project', item[0]);
                        preview.dispatch({ type: 'piskelID', value: item[0] });
                        settings.dispatch({ type: 'title', value: item[1].title });
                        settings.dispatch({ type: 'description', value: item[1].description });
                        setTimeout(() => {
                          fromDataToCanvas(item[1].frames);
                        }, 300);
                        $('#hideSavesButton').click();
                        $('#updateSaveButtonLoggedIn').click();
                        this.setState({ page: `create-animation/${item[0]}` });
                      }}
                    >
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
        {this.isRedirected()}
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
