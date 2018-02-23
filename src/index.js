// import { BrowserRouter } from 'react-router-dom';
import { BrowserRouter, Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import React from 'react';
import ReactDOM from 'react-dom';
import './css/App.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
    <BrowserRouter>
        <App/>
    </BrowserRouter>
),  document.getElementById('root'));
registerServiceWorker();
