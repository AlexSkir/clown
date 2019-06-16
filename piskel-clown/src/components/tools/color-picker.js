import $ from 'jquery';
import colorPicker from './images/colorpicker.png';
import store from '../../store/store';

// chose color from pop out panel of colors and bind it to current color box
function customedColorOnChange() {
  const customedColor = "rgb(" + $('#customed').val().match(/[A-Za-z0-9]{2}/g).map(function (v) {
    return parseInt(v, 16)
  }).join(", ") + ")";
  store.dispatch({ type: 'prevColor', value: store.getState().currentColor });
  store.dispatch({ type: 'currentColor', value: customedColor });
  $('#prevColor').css({ 'background-color': $('#currentColor').css('background-color') });
  $('#currentColor').css({ 'background-color': customedColor });
}

// change style of tool button
function colorPickerOnClick() {
  const a = store.getState().currentTool
  if (a !== 'colorPickerTool') {
    $('#palette-tool-area').find('button').removeClass('hovered');
    $('#color-picker').addClass('hovered');
    store.dispatch({ type: 'currentTool', value: 'colorPickerTool' })
    $('#color-picker').focus();
    $(document.body).css({ cursor: `url(${colorPicker}) 4 12, auto` });
  } else if (a === 'colorPickerTool') {
    store.dispatch({ type: 'currentTool', value: 'none' })
    $('#color-picker').removeClass('hovered');
    $('.color').addClass('hidden');
    $('#color-picker').blur();
    $(document.body).css({ cursor: 'default' });
  }
}

function changeBG(current, prev) {
  $('#currentColor').css({ 'background-color': current });
  $('#prevColor').css({ 'background-color': prev });
}

export { customedColorOnChange, colorPickerOnClick, changeBG };
