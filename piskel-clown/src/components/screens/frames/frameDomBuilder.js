import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import 'jquery-ui-sortable-npm';
import store from 'store/store';
import bg1 from 'assets/images/bg/bg1.png';
import { makeImage } from 'components/functions/preview';
import 'components/screens/frames/frames.css';
import { makeRandomId } from 'components/functions/random';
import * as canvas from 'components/functions/canvasManager';

export default class FramesWrapper extends React.Component {
  constructor() {
    super();
    this.state = {
      activeFrame: '',
      hovered: ''
    };
  }

  componentWillMount() {
    if (this.props.framesArray.length < 1) {
      const id = makeRandomId();
      this.setState({ activeFrame: id });
      store.dispatch({ type: 'framesArray', value: { id, frameSRC: '' } });
      store.dispatch({ type: 'currentCanvas', value: id });
    } else {
      this.setState({ activeFrame: this.props.framesArray[0].id });
      store.dispatch({ type: 'currentCanvas', value: this.props.framesArray[0].id });
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.updateImagePreview()
    }, 1000);
  }

  componentWillUnmount() {
    store.dispatch({ type: 'framesArray', value: null });
  }

  onMouseEnterHandler(id) {
    this.setState({ hovered: id });
  }

  onMouseLeaveHandler() {
    this.setState({ hovered: '' });
  }

  updateImagePreview() {
    this.props.framesArray.map(item => makeImage(item.id));
  }

  openCanvasHandler(frame) {
    this.setState({ activeFrame: frame });
    store.dispatch({ type: 'currentCanvas', value: frame });
    setTimeout(() => {
      this.updateImagePreview();
    }, 200);
  }

  copyFrameHandler(frameID) {
    const newFrameID = makeRandomId();
    const obj = {
      copy: frameID,
      stateObj: { id: newFrameID, frameSRC: '' }
    }
    store.dispatch({ type: 'framesArray', value: obj });

    setTimeout(() => {
      canvas.copyCanvas(frameID, newFrameID);
      this.openCanvasHandler(newFrameID);
    }, 200);
  }

  addNewFrameHandler() {
    const newFrameID = makeRandomId();
    this.setState({ activeFrame: newFrameID });
    store.dispatch({ type: 'framesArray', value: { id: newFrameID, frameSRC: '' } });
    setTimeout(() => {
      this.openCanvasHandler(newFrameID);
    }, 200);
  }

  removeFrameHandler(id) {
    store.dispatch({ type: 'framesArray', value: { delete: id } });
    setTimeout(() => {
      this.openCanvasHandler($('.frame-list').children().last()[0].id.split('frame')[1]);
    }, 200);
  }

  dragFrameOnClick() {
    $('#sortable').sortable();
    $('#sortable').sortable('option', 'disabled', false);
    $('#sortable').disableSelection();
  }

  dragOffOnClick(id, draggedFrom) {
    $('#sortable').sortable('option', 'disabled', true);
    Array.from($('#sortable').children()).forEach((item, i) => {
      if (item.id === `frame${id}`) {
        store.dispatch({ type: 'framesArray', value: { drag: draggedFrom, target: i, draggedFrame: id } });
      }
    })
    setTimeout(() => {
      this.openCanvasHandler(id);
    }, 200);
  }

  render() {
    return (
      <div className="frame-box"
      >
        <ul
          id="sortable"
          className="frame-list"
        >
          {this.props.framesArray.map((item, i) => (
            <li
              key={`frame-list-item-${item.id}`}
              className={`ui-state-default frame ${this.state.activeFrame === item.id ? 'activeFrame' : ''}`}
              id={`frame${item.id}`}
              style={{ background: this.props.bg || `url(${bg1})` }}
              onMouseEnter={() => this.onMouseEnterHandler(item.id)}
              onMouseLeave={() => this.onMouseLeaveHandler()}
              onClick={() => this.openCanvasHandler(item.id)}
            >
              <img
                id={`preview-box${item.id}`}
                className="preview-box"
                src={item.frameSRC}
                alt=""
              />
              <title className="number">{i + 1}</title>
              <span
                className={
                  `removeFrame ${
                  (this.props.framesArray.length !== 1 && this.state.hovered === item.id)
                    || (this.state.hovered === item.id && this.props.framesArray[0].id !== item.id)
                    ? '' : 'minorZ'}`}
                onClick={() => this.removeFrameHandler(item.id)}>
                <i className="fas fa-trash-alt" />
              </span>
              <span
                id={item.id}
                className={
                  `dragFrame ${
                  (this.props.framesArray.length !== 1 && this.state.hovered === item.id)
                    || (this.state.hovered === item.id && this.props.framesArray[0].id !== item.id)
                    ? '' : 'minorZ'}`}
                onMouseDown={() => this.dragFrameOnClick()}
                onMouseUp={() => this.dragOffOnClick(item.id, i)}
              >
                <i className="fas fa-arrows-alt" />
              </span>
              <span
                className={`copyFrame ${this.state.hovered === item.id ? '' : 'minorZ'}`}
                onClick={() => this.copyFrameHandler(item.id)}>
                <i className="fas fa-copy" />
              </span>
            </li>
          ))}
        </ul>
        <button
          className="addNewFrame"
          onClick={() => this.addNewFrameHandler()}
          type="button"
        >
          Add new frame
        </button>
      </div>
    );
  }
}

FramesWrapper.propTypes = {
  framesArray: PropTypes.array.isRequired,
  bg: PropTypes.string.isRequired
};
