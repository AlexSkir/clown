import { createStore } from 'redux';

function appState(state = {}, action) {
  switch (action.type) {
    case 'currentColor':
      return Object.assign({}, state, {
        currentColor: action.value
      })
    case 'prevColor':
      return Object.assign({}, state, {
        prevColor: action.value
      })
    case 'currentTool':
      return Object.assign({}, state, {
        currentTool: action.value
      })
    case 'currentCanvas':
      return Object.assign({}, state, {
        currentCanvas: action.value
      })
    case 'fps':
      return Object.assign({}, state, {
        fps: action.value
      })
    case 'customWidth':
      return Object.assign({}, state, {
        customWidth: action.value
      })
    default:
      return state
  }
}

let store = createStore(appState)

export default store;
