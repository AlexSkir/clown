import { createStore } from 'redux';

function appState(state = {}, action) {
  switch (action.type) {
    case 'currentPage':
      return Object.assign({}, state, {
        currentPage: action.value
      });
    case 'currentColor':
      return Object.assign({}, state, {
        currentColor: action.value
      });
    case 'backColor':
      return Object.assign({}, state, {
        backColor: action.value
      });
    case 'currentTool':
      return Object.assign({}, state, {
        currentTool: action.value
      });
    case 'fps':
      return Object.assign({}, state, {
        fps: action.value
      });
    case 'customWidth':
      return Object.assign({}, state, {
        customWidth: action.value
      });
    default:
      return state;
  }
}

function settingsState(state = {}, action) {
  switch (action.type) {
    case 'setBg':
      return Object.assign({}, state, {
        setBg: action.value
      });
    case 'title':
      return Object.assign({}, state, {
        title: action.value
      });
    default:
      return state;
  }
}

function previewState(state = {}, action) {
  switch (action.type) {
    case 'gif':
      return Object.assign({}, state, {
        gif: action.value
      });
    case 'frames':
      return Object.assign({}, state, {
        frames: action.value
      });
    case 'piskelID':
      return Object.assign({}, state, {
        piskelID: action.value
      });
    default:
      return state;
  }
}

function canvasState(state = {}, action) {
  switch (action.type) {
    case 'currentCanvas':
      return Object.assign({}, state, {
        currentCanvas: action.value
      });
    default:
      return state;
  }
}

function userState(state = {}, action) {
  switch (action.type) {
    case 'name':
      return Object.assign({}, state, {
        name: action.value
      });
    case 'imageURL':
      return Object.assign({}, state, {
        imageURL: action.value
      });
    default:
      return state;
  }
}

function optionsState(state = {}, action) {
  switch (action.type) {
    case 'optionsBlock':
      return Object.assign({}, state, {
        optionsBlock: action.value
      });
    default:
      return state;
  }
}

function paletteState(state = {}, action) {
  switch (action.type) {
    case 'addColor':
      return Object.assign({}, state, {
        addColor: action.value
      });
    default:
      return state;
  }
}

const preview = createStore(previewState);
const store = createStore(appState);
const settings = createStore(settingsState);
const canvas = createStore(canvasState);
const user = createStore(userState);
const options = createStore(optionsState);
const palette = createStore(paletteState);

export { store, settings, canvas, user, options, palette, preview };
