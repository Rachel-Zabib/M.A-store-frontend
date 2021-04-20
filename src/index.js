import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
//import $ from 'jquery';
//import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { Provider } from 'react-redux';

import store from './store/store';



ReactDOM.render( 
    <Provider store={store}>
        <App/>
    </Provider>
, document.getElementById('root'));




  