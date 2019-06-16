import $ from 'jquery';
import store from '../../store/store';
import paintBucketIcon from './images/bucket.png';

// change tool-button style, tool does not work yet
export default function paintBucketOnClick() {
  if (store.getState().currentTool !== 'paintBucketTool') {
    $('#palette-tool-area')
      .find('button')
      .removeClass('hovered');
    $('#paint-bucket').addClass('hovered');
    if (!$('.color').hasClass('hidden')) {
      $('.color').addClass('hidden');
    }
    store.dispatch({ type: 'currentTool', value: 'paintBucketTool' });
    $('#paint-bucket').focus();
    $(document.body).css({ cursor: `url(${paintBucketIcon}), auto` });
  } else if (store.getState().currentTool === 'paintBucketTool') {
    store.dispatch({ type: 'currentTool', value: '' });
    $('#paint-bucket').removeClass('hovered');
    $('#paint-bucket').blur();
    $(document.body).css({ cursor: 'default' });
  }
}
