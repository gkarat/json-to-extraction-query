import React, { FC } from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';

import store from '../store/store';
import { JsonData } from '../reducers/browserSlice';

import Main from './Main';

type OutputQuery = {
  path: string;
  columnPaths: string[];
  columnNames: string[];
};

type onFinishFunction = (query: OutputQuery) => void;

interface AppProps {
  json?: JsonData;
  onFinish: onFinishFunction;
}

const App: FC<AppProps> = ({ json = null }) => {
  return (
    <Provider store={store}>
      <Main json={json} />
    </Provider>
  );
};

export default hot(App);

export { App };
