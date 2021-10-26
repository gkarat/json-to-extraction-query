import './index.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './components/App';

const mountNode = document.getElementById('app');
ReactDOM.render(<App />, mountNode);

export { App as JsonToTableQueryApp };
