import * as React from 'react';

import { useAppDispatch, useAppSelector } from '../redux/hooks';

const ColumnSelectionPrompt = (): React.ReactElement => {
    return <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h3>Column selection prompt</h3>
        <textarea
            id="columnSelectionPromptInput"
            style={{ width: 'min(100%, 700px)', height: '100px', resize: 'none', marginBottom: '1rem' }}
            disabled
        />
        <button type="button" style={{ width: '100px' }}>Submit</button>
    </div>
}

export default ColumnSelectionPrompt;