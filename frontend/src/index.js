import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Login from './login';

const root = ReactDOM.createRoot(document.getElementById('root'));
if( localStorage.getItem("tokenid") == null)
root.render( <Login/>)
else
root.render( <App /> );


reportWebVitals();
