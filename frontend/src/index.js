import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    {/*I've placed BrowserRouter outside React.StrictMode to avoid errors caused by incompatibility
    of React Router v5 and modern React*/}
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);
