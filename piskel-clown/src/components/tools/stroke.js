import $ from 'jquery';
import './tools.css';
import { store } from '../../store/store';
import penIcon from './images/pen.png';

// change button-tool style if clicked
function strokeOnClick() {
  if (store.getState().currentTool !== 'strokeTool') {
    store.dispatch({ type: 'currentTool', value: 'strokeTool' });
    $('#palette-tool-area')
      .find('button')
      .removeClass('hovered');
    $('#stroke').addClass('hovered');
    $('#stroke').focus();
    $(document.body).css({ cursor: `url(${penIcon}) 1 18, auto` });
  } else if (store.getState().currentTool === 'strokeTool') {
    store.dispatch({ type: 'currentTool', value: '' });
    $('#stroke').removeClass('hovered');
    $('#stroke').blur();
    $(document.body).css({ cursor: 'default' });
  }
}

function rectangleOnClick() {
  if (store.getState().currentTool !== 'rectangleTool') {
    store.dispatch({ type: 'currentTool', value: 'rectangleTool' });
    $('#palette-tool-area')
      .find('button')
      .removeClass('hovered');
    $('#rectangle').addClass('hovered');
    $('#rectangle').focus();
    $(document.body).css({ cursor: `url(${penIcon}) 1 18, auto` });
  } else if (store.getState().currentTool === 'rectangleTool') {
    store.dispatch({ type: 'currentTool', value: '' });
    $('#rectangle').removeClass('hovered');
    $('#rectangle').blur();
    $(document.body).css({ cursor: 'default' });
  }
}

function circleOnClick() {
  if (store.getState().currentTool !== 'circleTool') {
    store.dispatch({ type: 'currentTool', value: 'circleTool' });
    $('#palette-tool-area')
      .find('button')
      .removeClass('hovered');
    $('#circle').addClass('hovered');
    $('#circle').focus();
    $(document.body).css({ cursor: `url(${penIcon}) 1 18, auto` });
  } else if (store.getState().currentTool === 'circleTool') {
    store.dispatch({ type: 'currentTool', value: '' });
    $('#circle').removeClass('hovered');
    $('#circle').blur();
    $(document.body).css({ cursor: 'default' });
  }
}

export { strokeOnClick, rectangleOnClick, circleOnClick };
