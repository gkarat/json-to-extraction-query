import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import data from './public/data.json';

const mountNode = document.getElementById('app');
ReactDOM.render(<App json={data} />, mountNode);
