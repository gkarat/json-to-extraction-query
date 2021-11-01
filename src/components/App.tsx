import React, { FC } from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';

import store from '../store/store';
import { JsonData } from '../reducers/browserSlice';

import Main from './Main';

export type OutputQuery = {
  path: string;
  columnPaths: string[];
  columnNames: string[];
};

export type onFinishFunction = (query: OutputQuery) => void;

interface AppProps {
  json?: JsonData;
  onFinish: onFinishFunction;
}

const App: FC<AppProps> = ({ json = null, onFinish }) => {
  return (
    <Provider store={store}>
      <Main json={json} onFinish={onFinish} />
    </Provider>
  );
};

export default hot(App);

export { App };
