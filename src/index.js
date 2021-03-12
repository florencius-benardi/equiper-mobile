import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './App';
import reportWebVitals from './reportWebVitals';
import * as Sentry from '@sentry/react';
import { Integrations } from "@sentry/tracing";
import { watchAuth } from "@sagas";
import authReducer from '@reducers';

Sentry.init({
  dsn: 'https://b3c953c802c84d1387db74907b7bf4a6@o398154.ingest.sentry.io/5511459',
  integrations: [
    new Integrations.BrowserTracing(),
  ],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

const sagaMiddleware = createSagaMiddleware();

const composedEnhancer = composeWithDevTools(
  applyMiddleware(thunkMiddleware, sagaMiddleware),
)

sagaMiddleware.run(watchAuth);

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = createStore(rootReducer, composedEnhancer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode >
  ,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
