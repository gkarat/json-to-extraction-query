import './index.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import QueryGenerator from './components/QueryGenerator';
import data from './public/data.json';

const mountNode = document.getElementById('app');
ReactDOM.render(<QueryGenerator json={data} />, mountNode);
