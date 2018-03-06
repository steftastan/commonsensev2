
import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import registerServiceWorker from './registerServiceWorker';
import './css/App.css';

ReactDOM.render((
    <BrowserRouter>
        <App/>
    </BrowserRouter>
),  document.getElementById('root'));
registerServiceWorker();
