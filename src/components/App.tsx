import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';

import store from '../redux/store';
import Main from './Main';

const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

export default hot(App);
