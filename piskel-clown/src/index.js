import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Menu from './components/menu/menu';
import * as serviceWorker from './serviceWorker';
import Tools from './components/tools/toolsDomBuilder';
import Canvas from './screens/canvas/canvasDomBuilder';
import Frames from './components/frames-list/frameDomBuilder';
import Preview from './screens/preview/previewDomBuilder';
import Options from './components/menu/options';


ReactDOM.render(<Menu />, document.getElementById('header'));
ReactDOM.render(<Tools />, document.getElementById('tool-pannel'));
ReactDOM.render(<Canvas />, document.getElementById('canvas-area'));
ReactDOM.render(<Frames />, document.getElementById('frame-area'));
ReactDOM.render(<Preview />, document.getElementById('preview-area'));
ReactDOM.render(<Options />, document.getElementById('options-area'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
