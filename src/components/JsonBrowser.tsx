import React, { useEffect } from 'react';
import JSONEditor, { EditableNode, JSONEditorMode } from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { updatePathSelection } from '../redux/pathSelectionSlice';
import { enableJsonBrowser, selectJsonBrowserDisabled } from '../redux/jsonBrowserSlice';

interface JsonBrowserProps {
    json: Record<string, unknown>;
}

const JsonBrowser = ({ json }: JsonBrowserProps): React.ReactElement<JsonBrowserProps> => {
    let jsoneditor: JSONEditor;
    let container: HTMLElement;

    const dispatch = useAppDispatch();
    const disabled = useAppSelector(selectJsonBrowserDisabled);

    useEffect(() => {
        const options =
        {
            mode: 'view' as JSONEditorMode,
            name: 'Insights Archive',
            onEvent: (node: EditableNode, event: string) => {
                // @ts-ignore: Wrong type for 'event' in @types/jsoneditor
                if ((event).type === 'click') {
                    dispatch(updatePathSelection(node.path.join('/')));
                }
            }
        };

        jsoneditor = new JSONEditor(container, options);
        jsoneditor.set(json);

        return () => {
            jsoneditor.destroy();
        }
    }, [])

    useEffect(() => {
        jsoneditor.update(json);
    }, [])

    return <div
        className="jsoneditor-react-container"
        style={{
            height: '100%',
            pointerEvents: disabled ? 'none' : 'auto',
            opacity: disabled ? '0.5' : '1'
        }}
        ref={elem => container = elem as HTMLDivElement}
        onClick={() => {
            console.log('test')
            if (disabled) {
                dispatch(enableJsonBrowser());
            }
        }}
    />;
}

export default JsonBrowser;