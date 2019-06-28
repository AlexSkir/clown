import $ from 'jquery';
import './tools.css';
import { store } from '../../store/store';
import erserIcon from './images/eraser.png';

// change button-tool style if clicked
export default function eraserOnClick() {
  if (store.getState().currentTool !== 'eraserTool') {
    store.dispatch({ type: 'currentTool', value: 'eraserTool' });
    $('#palette-tool-area')
      .find('button')
      .removeClass('hovered');
    $('#eraser').addClass('hovered');
    $('#eraser').focus();
    $(document.body).css({ cursor: `url(${erserIcon}) 1 18, auto` });
  } else if (store.getState().currentTool === 'eraserTool') {
    store.dispatch({ type: 'currentTool', value: '' });
    $('#eraser').removeClass('hovered');
    $('#eraser').blur();
    $(document.body).css({ cursor: 'default' });
  }
}
