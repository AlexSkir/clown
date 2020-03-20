import React from 'react';
import PropTypes from 'prop-types';
import store from 'store/store';
import { fromDataToCanvas } from 'components/functions/menuFunctions/fromImageToCanvas';
import { pageNavigator } from 'components/functions/navigation';

export default function LocalSaves(props) {
  const sorted = Object.entries(props.localProjects).sort((a, b) => b[1].time - a[1].time);
  return (
    <div className="local-saves-block">
      <div>
        <span className="local-saves-title">Browse local piskels</span>
        <i
          className="far fa-window-close local-saves-button"
          onClick={() => store.dispatch({ type: 'showLocalSaves', value: false })}
          onKeyPress={undefined}
          tabIndex="-1"
          role="button"
        />
      </div>
      <div className="table-wrapper">
        <table className="table-local-saves" cellPadding="20" cellSpacing="10">
          <thead>
            <tr>
              <th className="table-title">Name</th>
              <th className="table-title">Date</th>
              <th className="table-title">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(item => (
              <tr key={item[0]}>
                <td className="table-data">
                  {item[1].title}
                </td>
                <td className="table-data">
                  {item[1].date}
                </td>
                <td className="table-data table-data-buttons">
                  <button
                    type="button"
                    className="table-button"
                    onClick={() => {
                      store.dispatch({ type: 'projectID', value: item[0] });
                      store.dispatch({ type: 'project', value: item[1] });
                      store.dispatch({ type: 'framesArray', value: null });
                      store.dispatch({ type: 'framesArray', value: item[1].frames });
                      store.dispatch({ type: 'currentCanvas', value: item[1].frames[0].id });
                      store.dispatch({ type: 'showLocalSaves', value: false });
                      pageNavigator(null, 'general', 'create', null, item[0]);
                      setTimeout(() => {
                        fromDataToCanvas(item[1].frames);
                      }, 500);
                    }}
                  >
                    Load
                    </button>
                  <button
                    type="button"
                    className="table-button"
                    onClick={() => store.dispatch({ type: 'localProjects', value: ['delete', item[0]] })}
                  >
                    Delete
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

LocalSaves.propTypes = {
  localProjects: PropTypes.object.isRequired
}