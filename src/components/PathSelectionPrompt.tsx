import * as React from 'react';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { disableJsonBrowser, enableJsonBrowser } from '../redux/jsonBrowserSlice';
import { deferPathSelection, selectPathSelectionSubmitted, selectPathSelectionValue, submitPathSelection, updatePathSelection } from '../redux/pathSelectionSlice';

const PathSelectionPrompt = (): React.ReactElement => {
    const dispatch = useAppDispatch();
    const pathSelection = useAppSelector(selectPathSelectionValue);
    const pathSelectionSubmitted = useAppSelector(selectPathSelectionSubmitted);
    const handleOnInput = (e: React.FormEvent) => {
        dispatch(disableJsonBrowser());
        dispatch(updatePathSelection((e.target as HTMLTextAreaElement).value || ''))
    }

    return <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h3>Path selection prompt</h3>
        <textarea
            id="pathSelectionPromptInput"
            onInput={handleOnInput}
            value={pathSelection}
            style={{ width: 'min(100%, 700px)', height: '100px', resize: 'none', marginBottom: '1rem' }}
            disabled={pathSelectionSubmitted}
        />
        <div>
            <button
                type="button"
                style={{ width: '100px', marginRight: '10px' }}
                onClick={() => dispatch(submitPathSelection())}
            >
                Submit
            </button>
            <button
                type="reset"
                style={{ width: '100px' }}
                onClick={() => {
                    dispatch(deferPathSelection());
                    dispatch(updatePathSelection(''));
                    dispatch(enableJsonBrowser());
                }}
            >
                Reset
            </button>
        </div>
    </div>
}

export default PathSelectionPrompt;