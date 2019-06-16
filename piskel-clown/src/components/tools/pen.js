import $ from 'jquery';
import './tools.css';
import store from '../../store/store';
import penIcon from './images/pen.png';

// change button-tool style if clicked
export default function penOnClick() {
  if (store.getState().currentTool !== 'penTool') {
    $('#palette-tool-area')
      .find('button')
      .removeClass('hovered');
    store.dispatch({ type: 'currentTool', value: 'penTool' });
    $('#pen').addClass('hovered');
    $('#pen').focus();
    $(document.body).css({ cursor: `url(${penIcon}) 1 18, auto` });
  } else if (store.getState().currentTool === 'penTool') {
    store.dispatch({ type: 'currentTool', value: '' });
    $('#pen').removeClass('hovered');

    $('#pen').blur();
    $(document.body).css({ cursor: 'default' });
  }
}
