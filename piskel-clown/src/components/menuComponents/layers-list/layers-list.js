import React from 'react';
import AwesomeButton from 'components/buttons/awesomeButton';
import 'components/menuComponents/layers-list/layers-list.css';

class Layers extends React.Component {
  constructor() {
    super();
    this.state = {
      hovered: '',
      mouseEnter: false
    };
  }

  popHintOnMouseOver(e) {
    const hovered = e.target.getAttribute('id');
    if (this.state.hovered === hovered) {
      this.setState({ hovered: '' });
    } else {
      this.setState({ hovered });
    }
  }

  mouseIn() {
    this.setState({ mouseEnter: true });
  }

  mouseOut() {
    this.setState({ mouseEnter: false });
  }

  render() {
    return (
      <div
        className="layers-box"
        onMouseOver={e => this.popHintOnMouseOver(e)}
        onFocus={() => undefined}
      >
        <div className="layer-outlet">
          <span className="layer-title">Layers</span>
          <AwesomeButton
            buttonClass="layer-button layer-preview"
            onClickHandler={() => undefined}
            iconClass="fas fa-eye"
            active={null}
            title="Preview all layers"
            placement="top-end"
          />
        </div>
        <div className="layer-buttons-box">
          <AwesomeButton
            buttonClass="layer-button"
            onClickHandler={() => undefined}
            iconClass="fas fa-plus"
            active={null}
            title="Create a layer"
            placement="top-end"
          />
          <AwesomeButton
            buttonClass="layer-button"
            onClickHandler={() => undefined}
            iconClass="fas fa-arrow-up"
            active={null}
            title="Move layer up"
            placement="top-end"
          />
          <AwesomeButton
            buttonClass="layer-button"
            onClickHandler={() => undefined}
            iconClass="fas fa-arrow-down"
            active={null}
            title="Move layer down"
            placement="top-end"
          />
          <AwesomeButton
            buttonClass="layer-button"
            onClickHandler={() => undefined}
            iconClass="fas fa-pen"
            active={null}
            title="Edit layer name"
            placement="top-end"
          />
          <AwesomeButton
            buttonClass="layer-button"
            onClickHandler={() => undefined}
            iconClass="fas fa-compress"
            active={null}
            title="Merge with layer below"
            placement="top-end"
          />
          <AwesomeButton
            buttonClass="layer-button"
            onClickHandler={() => undefined}
            iconClass="fas fa-times"
            active={null}
            title="Delete selected layer"
            placement="top-end"
          />
        </div>
        <ul className="layer-list">
          <li className="layer-item">Layer 1</li>
        </ul>
      </div>
    );
  }
}

export default Layers;
