import * as React from 'react';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { disableBrowser, enableBrowser } from '../redux/browserSlice';
import {
  deferPath,
  selectSubmitted,
  selectNodes,
  submitPath,
  updateNodes,
} from '../redux/pathSlice';

const PathSelectionPrompt = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const pathNodes = useAppSelector(selectNodes);
  const pathSelectionSubmitted = useAppSelector(selectSubmitted);
  const handleOnInput = (e: React.FormEvent) => {
    dispatch(disableBrowser());
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h3>Path selection prompt</h3>
      <textarea
        id="pathSelectionPromptInput"
        onInput={handleOnInput}
        value={pathSelection}
        style={{
          width: 'min(100%, 700px)',
          height: '100px',
          resize: 'none',
          marginBottom: '1rem',
        }}
        disabled={pathSelectionSubmitted}
      />
      <div>
        <button
          type="button"
          style={{ width: '100px', marginRight: '10px' }}
          onClick={() => dispatch(submitPath())}
        >
          Submit
        </button>
        <button
          type="reset"
          style={{ width: '100px' }}
          onClick={() => dispatch(deferPath())}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default PathSelectionPrompt;
