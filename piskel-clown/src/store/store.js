import { createStore } from 'redux';
import messages from 'locales';
import $ from 'jquery';
import bg1 from 'assets/images/bg/bg1.png';

const initialState = {
  locales: {
    locale: localStorage.getItem('locale') || 'en',
    messages: messages.ru,
  },
  page: localStorage.getItem('page')
    ? localStorage.getItem('page').indexOf('projects') !== -1
      ? 'user'
      : localStorage.getItem('page')
    : '',
  userData: JSON.parse(localStorage.getItem('userData')) || {
    info: {
      id: 'none',
      name: 'none',
      image: 'none'
    },
    isAuthed: false
  },
  error: false,
  toolState: {
    currentTool: '',
    currentColor: '#161030',
    backColor: '#c0c0c0'
  },
  settings: {
    currentBG: `url(${bg1})`,
    customWidth: 33
  },
  projectID: localStorage.getItem('projectID') || '',
  project: {
    gif: '',
    frames: '',
    title: 'New Piskel-clone',
    description: '',
    date: '',
    time: '',
    fps: 3
  },
  currentCanvas: '',
  googleLinks: [],
  palette: [],
  showLocalSaves: false,
  localProjects: JSON.parse(localStorage.getItem('localProjects')) || {},
  allProjects: JSON.parse(localStorage.getItem('allProjects')) || {},
  framesArray: []
};

function appState(state = initialState, action) {
  switch (action.type) {
    case 'locale':
      localStorage.setItem('locale', action.value);
      return Object.assign({}, state, {
        locale: action.value
      });
    case 'page':
      localStorage.setItem('page', action.value);
      return Object.assign({}, state, {
        page: action.value
      });
    case 'userData':
      const userData = {
        info: {
          id: action.value.id,
          name: action.value.name,
          image: action.value.image
        },
        isAuthed: action.value !== ''
      }
      localStorage.setItem('userData', JSON.stringify(userData));
      return {
        ...state,
        userData
      };
    case 'error':
      return Object.assign({}, state, {
        error: action.value
      });
    case 'toolState':
      if (action.value instanceof Array) {
        for (let key in state.toolState) {
          if (action.value[0] === key) {
            state.toolState[key] = action.value[1]
          }
          if (action.value[0] === 'currentColor') {
            $('#customed1').val(action.value[1]);
          } else if (action.value[0] === 'backColor') {
            $('#customed2').val(action.value[1]);
          }
        }
        return {
          ...state,
          ...state.toolState
        };
      } else {
        return Object.assign({}, state, {
          toolState: action.value
        });
      }
    case 'settings':
      for (let key in state.settings) {
        if (action.value[0] === key) {
          state.settings[key] = action.value[1]
        }
      }
      return {
        ...state,
        ...state.settings
      };
    case 'projectID':
      localStorage.setItem('projectID', action.value);
      return Object.assign({}, state, {
        projectID: action.value
      });
    case 'project':
      if (action.value instanceof Array) {
        for (let key in state.project) {
          if (action.value[0] === key) {
            state.project[key] = action.value[1]
          }
        }
        return {
          ...state,
          ...state.project
        };
      } else if (action.value === 'initial') {
        const obj = initialState.project;
        return Object.assign({}, state, {
          project: obj
        });
      } else {
        return Object.assign({}, state, {
          project: action.value
        });
      }
    case 'currentCanvas':
      return Object.assign({}, state, {
        currentCanvas: action.value
      });
    case 'showLocalSaves':
      return Object.assign({}, state, {
        showLocalSaves: action.value
      });
    case 'googleLinks':
      return Object.assign({}, state, {
        googleLinks: action.value
      });
    case 'palette':
      const array = state.palette;
      if (array.indexOf(action.value) === -1) {
        array.push(action.value);
      }
      return Object.assign({}, state, {
        palette: array
      });
    case 'localProjects':
      if (action.value instanceof Array) {
        const projects = state.localProjects;
        if (action.value[0] === 'delete') {
          delete projects[action.value[1]];
          localStorage.setItem('localProjects', JSON.stringify(projects));
        }
        return {
          ...state,
          ...projects
        };
      } else {
        localStorage.setItem('localProjects', JSON.stringify(action.value));
        return Object.assign({}, state, {
          localProjects: action.value
        });
      }
    case 'allProjects':
      if (action.value instanceof Array) {
        const projects = state.allProjects;
        if (action.value[0] === 'delete') {
          delete projects[action.value[1]][action.value[2]];
          localStorage.setItem('allProjects', JSON.stringify(projects));
        }
        return {
          ...state,
          ...projects
        };
      } else {
        localStorage.setItem('allProjects', JSON.stringify(action.value));
        return Object.assign({}, state, {
          allProjects: action.value
        });
      }
    case 'framesArray':
      let framesID = state.framesArray;
      if (action.value instanceof Object) {
        if (framesID.length >= 1) {
          if (action.value.copy !== undefined) {
            framesID.forEach((item, i) => {
              if (item.id === action.value.copy) {
                framesID.splice(i + 1, 0, action.value.stateObj);
              }
            });
          } else if (action.value.delete !== undefined) {
            framesID.forEach((item, i) => {
              if (item.id === action.value.delete) {
                framesID.splice(i, 1);
              }
            });
          } else if (action.value.update !== undefined) {
            framesID.forEach((item, i) => {
              if (item.id === action.value.update) {
                framesID[i].frameSRC = action.value.src;
              }
            });
          } else if (action.value.drag !== undefined) {
            let target = framesID[action.value.target];
            let dragged = framesID[action.value.drag];
            framesID[action.value.target] = dragged;
            framesID[action.value.drag] = target;
          } else if (action.value === null) {
            return Object.assign({}, state, {
              framesArray: []
            });
          } else {
            if (framesID.every(item => item.id !== action.value.id)) {
              framesID.push(action.value);
            }
          }
        } else {
          if (action.value.length > 0) {
            action.value.map(item => framesID.push(item))
          } else {
            framesID = [{ id: action.value.id, frameSRC: action.value.frameSRC }];
          }
        }
      } else if (action.value === null) {
        return Object.assign({}, state, {
          framesArray: []
        });
      }
      return Object.assign({}, state, {
        framesArray: framesID
      });
    default:
      return state;
  }
}

const store = createStore(appState);

export default store;
