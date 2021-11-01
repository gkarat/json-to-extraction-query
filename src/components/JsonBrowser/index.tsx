import './index.scss';

import React, { ReactElement, useEffect, useState } from 'react';
import JSONEditor, { EditableNode, JSONEditorMode } from 'jsoneditor';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateNodes } from '../../reducers/pathSlice';
import {
  selectDisabled as selectBrowserDisabled,
  selectJson,
} from '../../reducers/browserSlice';

const JsonBrowser = (): ReactElement => {
  const dispatch = useAppDispatch();
  const disabled = useAppSelector(selectBrowserDisabled);
  const data = useAppSelector(selectJson);

  const [editor, setEditor] = useState<JSONEditor>();
  const [container, setContainer] = useState<HTMLElement>();

  const options = {
    mode: 'view' as JSONEditorMode,
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
