import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'react-toastify/dist/ReactToastify.css';
import Login from './login';

const root = ReactDOM.createRoot(document.getElementById('root'));
function Root() {
  const [authenticated, setAuthenticated] = useState(Boolean(localStorage.getItem("tokenid")));
  return authenticated ? <App /> : <Login onLogin={() => setAuthenticated(true)} />;
}
root.render(<Root />);

reportWebVitals();
