import $ from 'jquery';
import colorPicker from './images/colorpicker.png';
import { store } from '../../store/store';

// chose color from pop out panel of colors and bind it to current color box
function customedColorOnChange(id) {
  const newValue = $(`#${id}`).val();
  const customedColor = `rgb(${$(`#${id}`)
    .val()
    .match(/[A-Za-z0-9]{2}/g)
    .map(v => {
      return parseInt(v, 16);
    })
    .join(', ')})`;
  if (id === 'customed1') {
    store.dispatch({ type: 'currentColor', value: customedColor });
    $('#currentColor').css({ 'background-color': customedColor });
  }
  if (id === 'customed2') {
    store.dispatch({ type: 'backColor', value: customedColor });
    $('#backColor').css({ 'background-color': customedColor });
  }

  $(`#${id}`).attr('value', newValue);
}

// change style of tool button
function colorPickerOnClick() {
  if (store.getState().currentTool !== 'colorPickerTool') {
    $('#palette-tool-area')
      .find('button')
      .removeClass('hovered');
    $('#color-picker').addClass('hovered');
    store.dispatch({ type: 'currentTool', value: 'colorPickerTool' });
    $('#color-picker').focus();
    $(document.body).css({ cursor: `url(${colorPicker}) 1 10, auto` });
  } else if (store.getState().currentTool === 'colorPickerTool') {
    store.dispatch({ type: 'currentTool', value: 'none' });
    $('#color-picker').removeClass('hovered');
    $('#color-picker').blur();
    $(document.body).css({ cursor: 'default' });
  }
}

function rgbaToHex(r, g, b) {
  let hexR = r.toString(16);
  let hexG = g.toString(16);
  let hexB = b.toString(16);
  if (hexR.length < 2) {
    hexR = `0${hexR}`;
  }
  if (hexG.length < 2) {
    hexG = `0${hexG}`;
  }
  if (hexB.length < 2) {
    hexB = `0${hexB}`;
  }
  return `#${hexR}${hexG}${hexB}`;
}

function rgbToHex(color) {
  const hex = `${color}`;

  const nums = /(.*?)rgb\((\d+),\s*(\d+),\s*(\d+)\)/i.exec(hex);
  const r = parseInt(nums[2], 10).toString(16);
  const g = parseInt(nums[3], 10).toString(16);
  const b = parseInt(nums[4], 10).toString(16);

  return `#${r.length === 1 ? `0${r}` : r}${g.length === 1 ? `0${g}` : g}${
    b.length === 1 ? `0${b}` : b
  }`;
}

export { customedColorOnChange, colorPickerOnClick, rgbaToHex, rgbToHex };
