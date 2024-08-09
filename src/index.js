const React = require('react');
const ReactDOM = require('react-dom');
const { Provider } = require('react-redux');
const { createStore, applyMiddleware, compose } = require('redux');
const thunk = require('redux-thunk').default;
const rootReducer = require('./reducers');
const App = require('./App');
require('./index.css');

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootElement
  );
} else {
  console.error("Failed to find the root element");
}