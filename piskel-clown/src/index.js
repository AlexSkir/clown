import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import ru from 'react-intl/locale-data/ru';
import App from 'app';
import store from 'store/store';
import * as serviceWorker from './serviceWorker';
import ConnectedIntlProvider from './ConnectedIntlProvider';
import 'index.css';
import 'reset.css';

addLocaleData([...en, ...ru]);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedIntlProvider>
      <App />
    </ConnectedIntlProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
