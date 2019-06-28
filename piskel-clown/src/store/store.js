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
    case 'prevColor':
      return Object.assign({}, state, {
        prevColor: action.value
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

const store = createStore(appState);
const settings = createStore(settingsState);
const canvas = createStore(canvasState);
const user = createStore(userState);
const options = createStore(optionsState);

export { store, settings, canvas, user, options };
