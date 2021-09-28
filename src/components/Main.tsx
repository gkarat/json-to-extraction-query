import * as React from 'react';

import data from '../public/data.json';
import JsonBrowser from './JsonBrowser';
import PathSelectionPrompt from './PathSelectionPrompt';
import ColumnSelectionPrompt from './ColumnSelectionPrompt';
import { useAppSelector } from '../redux/hooks';
import { selectPathSelectionSubmitted, selectPathSelectionValue } from '../redux/pathSelectionSlice';
import { selectColumnSelectionSubmitted, selectColumnSelectionValue } from '../redux/columnSelectionSlice';

const Main = (): React.ReactElement => {
    const pathSelectionSubmitted = useAppSelector(selectPathSelectionSubmitted);
    const columnSelectionSubmitted = useAppSelector(selectColumnSelectionSubmitted);
    const pathSelectionValue = useAppSelector(selectPathSelectionValue);
    const columnSelectionValue = useAppSelector(selectColumnSelectionValue);
    const mainObj = document.querySelector('main');
    mainObj?.addEventListener('queryGeneration', (e) => console.log((e as CustomEvent)?.detail))

    return (
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
                <div style={{ gridArea: '2 / 2 / 3 / 4', padding: '1rem' }}><ColumnSelectionPrompt />
                    <button
                        style={{ width: '100px', position: 'absolute', bottom: '30px' }}
                        disabled={!pathSelectionSubmitted || !columnSelectionSubmitted}
                        onClick={() => {
                            const event = new CustomEvent("queryGeneration", {
                                detail: {
                                    pathSelectionValue,
                                    columnSelectionValue
                                }
                            });
                            mainObj?.dispatchEvent(event);
                        }}
                    >
                        Finish
                    </button>
                </div>
            </div>
        </main >
    );
};

export default Main;
