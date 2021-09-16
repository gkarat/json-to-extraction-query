import * as React from 'react';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { disableJsonBrowser } from '../redux/jsonBrowserSlice';
import { selectPathSelectionValue, updatePathSelection } from '../redux/pathSelectionSlice';

const PathSelectionPrompt = (): React.ReactElement => {
    const dispatch = useAppDispatch();
    const pathSelection = useAppSelector(selectPathSelectionValue)
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
        />
        <button type="button" style={{ width: '100px' }}>Submit</button>
    </div>
}

export default PathSelectionPrompt;