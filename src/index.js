import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import App from './App';
import './index.css';

// Create the Redux store using configureStore from Redux Toolkit
const store = configureStore({
  reducer: rootReducer, // Pass the root reducer
  // You can add middleware and other store enhancers here if needed
});

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
} else {
  console.error("Failed to find the root element");
}