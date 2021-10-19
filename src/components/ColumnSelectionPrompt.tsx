import * as React from 'react';
import { deferColumnSelection, selectColumnSelectionSubmitted, submitColumnSelection, updateColumnSelection } from '../redux/columnsSlice';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectPathSelectionSubmitted } from '../redux/pathSlice';

const ColumnSelectionPrompt = (): React.ReactElement => {
    const dispatch = useAppDispatch();
    const pathSelectionSubmitted = useAppSelector(selectPathSelectionSubmitted);
    const columnSelectionSubmitted = useAppSelector(selectColumnSelectionSubmitted);
    const handleOnInput = (e: React.FormEvent) => {
        dispatch(updateColumnSelection((e.target as HTMLTextAreaElement).value || ''))
    }

    return <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h3>Column selection prompt</h3>
        <textarea
            id="columnSelectionPromptInput"
            onInput={handleOnInput}
            style={{ width: 'min(100%, 700px)', height: '100px', resize: 'none', marginBottom: '1rem' }}
            disabled={!pathSelectionSubmitted || columnSelectionSubmitted}
        />
        <div>
            <button
                type="button"
                style={{ width: '100px', marginRight: '10px' }}
                onClick={() => dispatch(submitColumnSelection())}
            >
                Submit
            </button>
            <button
                type="reset"
                style={{ width: '100px' }}
                onClick={() => {
                    dispatch(deferColumnSelection());
                    dispatch(updateColumnSelection(''));
                }}
            >
                Reset
            </button>
        </div>
    </div>
}

export default ColumnSelectionPrompt;