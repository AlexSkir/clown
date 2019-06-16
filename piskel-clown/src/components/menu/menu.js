import React from 'react';
import './menu.css';

class Menu extends React.Component {
  constructor() {
    super();
    this.state = {
      active: ''
    };
  }

  addActiveClass(e) {
    const hovered = e.target.getAttribute('id');
    if (this.state.active === hovered) {
      this.setState({ active: '' });
    } else {
      this.setState({ active: hovered });
    }
  }

  render() {
    const active = this.state.active;
    return (
      <header className="header">
        <div className="header-menu">
          <span className="menu-list">
            <i
              className={`fas fa-bars ${active === 'list' ? 'active' : ''}`}
              id="list"
              onMouseOver={e => {
                this.addActiveClass(e);
              }}
              onFocus={() => undefined}
            />
          </span>
          <ul className="dropdown">
            <li className={`list ${active === 'list' ? 'active' : 'hidden'}`}>
              <span id="export" className="menu-item">
                Export animation
              </span>
            </li>
            <li className={`list ${active === 'list' ? 'active' : 'hidden'}`}>
              <span id="save" className="menu-item">
                Save progress
              </span>
            </li>
            <li className={`list ${active === 'list' ? 'active' : 'hidden'}`}>
              <span id="load" className="menu-item">
                Load animation
              </span>
            </li>
          </ul>

          <span
            className="task-name"
            onMouseOver={e => {
              this.addActiveClass(e);
            }}
            onFocus={() => undefined}
          >
            CodeJam - Animation Player
          </span>
        </div>
      </header>
    );
  }
}

export default Menu;
