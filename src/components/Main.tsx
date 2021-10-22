import React from 'react';

import data from '../public/data.json';
import JsonBrowser from './JsonBrowser';
import PathSelectionPrompt from './PathSelectionPrompt';
import ColumnSelectionPrompt from './ColumnSelectionPrompt';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  selectSubmitted as selectPathSubmitted,
  selectJsonPath,
} from '../redux/pathSlice';
import {
  selectColumnsSubmitted,
  selectColumnsPaths,
} from '../redux/columnsSlice';
import { SUBMIT_QUERY_EVENT_NAME } from '../AppConstants';

const Main = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const pathSubmitted = useAppSelector(selectPathSubmitted);
  const columnsSubmitted = useAppSelector(selectColumnsSubmitted);
  const path = useAppSelector(selectJsonPath);
  const columns = useAppSelector(selectColumnsPaths);
  const submitQueryButton = document.querySelector('#submit-query-button');
  const event = new CustomEvent(SUBMIT_QUERY_EVENT_NAME, {
    detail: {
      path,
      columns,
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
        <div
          style={{
            gridArea: '1 / 2 / 2 / 3',
            position: 'relative',
            padding: '1rem',
          }}
        >
          <h3>Path selection prompt</h3>
          <PathSelectionPrompt />
        </div>
        <div
          style={{
            gridArea: '2 / 2 / 3 / 4',
            position: 'relative',
            padding: '1rem',
          }}
        >
          <h3>Column selection prompt</h3>
          <ColumnSelectionPrompt disabled={!pathSubmitted} />
          <div
            style={{
              position: 'absolute',
              bottom: '1rem',
              right: '2rem',
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
            }}
          >
            <button
              id="submit-query-button"
              disabled={!pathSubmitted || !columnsSubmitted}
              onClick={(e) => {
                e.target.dispatchEvent(event);
              }}
            >
              Finish
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
