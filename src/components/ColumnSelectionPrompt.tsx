import * as React from 'react';
import {
  deferColumns,
  selectSubmitted as selectColumnsSubmitted,
  submitColumns,
  updateColumns,
} from '../redux/columnsSlice';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectSubmitted as selectPathSubmitted } from '../redux/pathSlice';

const ColumnSelectionPrompt = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const pathSelectionSubmitted = useAppSelector(selectPathSubmitted);
  const columnSelectionSubmitted = useAppSelector(selectColumnsSubmitted);
  const handleOnInput = (e: React.FormEvent) => {
    dispatch(updateColumns((e.target as HTMLTextAreaElement).value || ''));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h3>Column selection prompt</h3>
      <textarea
        id="columnSelectionPromptInput"
        onInput={handleOnInput}
        style={{
          width: 'min(100%, 700px)',
          height: '100px',
          resize: 'none',
          marginBottom: '1rem',
        }}
        disabled={!pathSelectionSubmitted || columnSelectionSubmitted}
      />
      <div>
        <button
          type="button"
          style={{ width: '100px', marginRight: '10px' }}
          onClick={() => dispatch(submitColumns())}
        >
          Submit
        </button>
        <button
          type="reset"
          style={{ width: '100px' }}
          onClick={() => {
            dispatch(deferColumns());
            dispatch(updateColumns(''));
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default ColumnSelectionPrompt;
