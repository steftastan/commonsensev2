import React from 'react';
import ReactDOM from 'react-dom';
import './css/App.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import $ from 'jquery';


//ReactDOM.render(<App userData={userData} commonSenseLinkList={commonSenseLinkList} />, document.getElementById('root'));
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
