import * as React from 'react';

import data from '../public/data.json';
import JsonBrowser from './JsonBrowser';
import PathSelectionPrompt from './PathSelectionPrompt';
import ColumnSelectionPrompt from './ColumnSelectionPrompt';
import { useAppSelector } from '../redux/hooks';
import { selectPathSubmitted, selectPathValue } from '../redux/pathSlice';
import {
  selectColumnsSubmitted,
  selectColumnSelectionValue,
} from '../redux/columnsSlice';
import { SUBMIT_QUERY_EVENT_NAME } from '../AppConstants';

const Main = (): React.ReactElement => {
  const pathSubmitted = useAppSelector(selectPathSelectionSubmitted);
  const columnsSubmitted = useAppSelector(selectColumnsSubmitted);
  const pathValue = useAppSelector(selectPathValue);
  const columnSelectionValue = useAppSelector(selectColumnSelectionValue);
  const submitQueryButton = document.querySelector('#submit-query-button');
  const event = new CustomEvent(SUBMIT_QUERY_EVENT_NAME, {
    detail: {
      pathSelectionValue,
      columnSelectionValue,
    },
  });
  submitQueryButton?.addEventListener(SUBMIT_QUERY_EVENT_NAME, (e) => {
    e.stopImmediatePropagation();
    console.log((e as CustomEvent).detail);
  });

  return (
    <main>
      <div
        style={{
          display: 'grid',
          gridTemplate: '1fr 1fr / 1fr 1fr',
        }}
      >
        <div
          style={{
            gridArea: '1 / 1 / 3 / 2',
            overflow: 'auto',
            maxHeight: '100%',
            resize: 'horizontal',
            padding: '1rem',
          }}
        >
          <JsonBrowser json={data} />
        </div>
        <div style={{ gridArea: '1 / 2 / 2 / 3', padding: '1rem' }}>
          <PathSelectionPrompt />
        </div>
        <div style={{ gridArea: '2 / 2 / 3 / 4', padding: '1rem' }}>
          <ColumnSelectionPrompt />
          <button
            id="submit-query-button"
            style={{ width: '100px', position: 'absolute', bottom: '30px' }}
            disabled={!pathSelectionSubmitted || !columnSelectionSubmitted}
            onClick={(e) => {
              e.target.dispatchEvent(event);
            }}
          >
            Finish
          </button>
        </div>
      </div>
    </main>
  );
};

export default Main;
