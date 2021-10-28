import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';

import store from '../store/store';
import Main from './Main';
import { JsonData } from '../reducers/browserSlice';

interface QueryGeneratorProps {
  json?: JsonData;
}

const QueryGenerator = ({
  json = null,
}: QueryGeneratorProps): React.ReactNode => {
  return (
    <Provider store={store}>
      <Main json={json} />
    </Provider>
  );
};

export default hot(QueryGenerator);

export { QueryGenerator };
