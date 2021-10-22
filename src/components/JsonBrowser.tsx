import React, { useEffect, useState } from 'react';
import JSONEditor, { EditableNode, JSONEditorMode } from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { updateNodes } from '../redux/pathSlice';
import { selectBrowserDisabled, selectData } from '../redux/browserSlice';

interface JsonBrowserProps {
  json: Record<string, unknown>;
}

const JsonBrowser = ({
  json,
}: JsonBrowserProps): React.ReactElement<JsonBrowserProps> => {
  const dispatch = useAppDispatch();
  const disabled = useAppSelector(selectBrowserDisabled);
  const data = useAppSelector(selectData);

  const [editor, setEditor] = useState<JSONEditor>();
  const [container, setContainer] = useState<HTMLElement>();

  const options = {
    mode: 'view' as JSONEditorMode,
    name: '3976d107-a45e-49fb-935b-1926f16cfd87',
    /* 
    onClassName: ({ path, field, value }) => {
      if (
        Array.isArray(path) &&
        Array.isArray(pathNodes) &&
        path.length === pathNodes.length &&
        pathNodes.every((val, index) => val === path[index])
      ) {
        // console.log(path)
        return 'test';
      }
      return undefined;
    },
    onTextSelectionChange: (
      start: SelectionPosition,
      end: SelectionPosition,
      text: string
    ) => {
      // console.log(start, end, text);
    }, */
    onEvent: (node: EditableNode, event: any) => {
      if (!disabled && event.type === 'click') {
        dispatch(updateNodes(node.path));
      }
    },
  };

  useEffect(() => {
    if (container) {
      editor?.destroy();
      setEditor(new JSONEditor(container, options, data));
    }
  }, [container, data, disabled]);

  return (
    <div
      className="jsoneditor-react-container"
      style={{
        height: '100%',
      }}
      ref={(elem) => setContainer(elem as HTMLDivElement)}
    />
  );
};

export default JsonBrowser;
