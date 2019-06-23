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
    case 'currentCanvas':
      return Object.assign({}, state, {
        currentCanvas: action.value
      });
    case 'fps':
      return Object.assign({}, state, {
        fps: action.value
      });
    case 'customWidth':
      return Object.assign({}, state, {
        customWidth: action.value
      });
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

const store = createStore(appState);

export default store;
