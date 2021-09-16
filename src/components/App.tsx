import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';

import data from '../public/data.json';
import JsonBrowser from './JsonBrowser';
import store from '../redux/store';
import PathSelectionPrompt from './PathSelectionPrompt';
import ColumnSelectionPrompt from './ColumnSelectionPrompt';

const App = () => {
  return (
    <Provider store={store}>
      <main>
        <div style={{
          display: 'grid',
          gridTemplate: '1fr 1fr / 1fr 1fr',
        }}>
          <div style={{
            gridArea: '1 / 1 / 3 / 2',
            overflow: "auto",
            maxHeight: '100%',
            resize: 'horizontal',
            padding: '1rem'
          }}>
            <JsonBrowser json={data} />
          </div>
          <div style={{ gridArea: '1 / 2 / 2 / 3', padding: '1rem' }}><PathSelectionPrompt /></div>
          <div style={{ gridArea: '2 / 2 / 3 / 4', padding: '1rem' }}><ColumnSelectionPrompt /></div>
        </div>
      </main >
    </Provider>
  );
};

export default hot(App);
