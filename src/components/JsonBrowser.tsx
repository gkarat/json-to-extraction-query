import React, { useEffect } from 'react';
import JSONEditor, {
  EditableNode,
  FieldEditable,
  JSONEditorMode,
  SelectionPosition,
} from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectNodes, updateNodes } from '../redux/pathSlice';
import { enableBrowser, selectBrowserDisabled } from '../redux/browserSlice';

interface JsonBrowserProps {
  json: Record<string, unknown>;
}

const translateToJSONPath = (nodes: Array<string | number>): string => {
  return '$.' + nodes.map((n) => `[${n}]`).join('.');
};

const JsonBrowser = ({
  json,
}: JsonBrowserProps): React.ReactElement<JsonBrowserProps> => {
  const dispatch = useAppDispatch();
  const disabled = useAppSelector(selectBrowserDisabled);
  const jsonPath = useAppSelector(selectNodes);

  let jsoneditor: JSONEditor;
  let container: HTMLElement;

  useEffect(() => {
    const options = {
      mode: 'view' as JSONEditorMode,
      modes: [
        'tree',
        'view',
        'form',
        'code',
        'text',
        'preview',
      ] as JSONEditorMode[],
      name: 'Insights Archive',
      // eslint-disable-next-line @typescript-eslint/ban-types
      onEditable: (node: object | EditableNode): boolean | FieldEditable => {
        return false;
      },
      // @ts-ignore
      onClassName: ({ path, field, value }) => {
        if (
          Array.isArray(path) &&
          Array.isArray(jsonPath) &&
          path.length === jsonPath.length &&
          jsonPath.every((val, index) => val === path[index])
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
      },
      // @ts-ignore: Wrong type for 'event' in @types/jsoneditor
      onEvent: (node: EditableNode, event: Event) => {
        if (event.type === 'click') {
          dispatch(updateNodes(node.path));
        }
      },
    };
    jsoneditor = new JSONEditor(container, options, json);
    return () => {
      jsoneditor.destroy();
    };
  }, []);

  useEffect(() => {
    console.log(jsoneditor);
    if (jsoneditor) {
      //jsoneditor.refresh();
    }
  }, [jsonPath]);

  return (
    <div
      className="jsoneditor-react-container"
      style={{
        height: '100%',
        pointerEvents: disabled ? 'none' : 'auto',
        opacity: disabled ? '0.5' : '1',
      }}
      ref={(elem) => (container = elem as HTMLDivElement)}
      onClick={() => {
        if (disabled) {
          dispatch(enableBrowser());
        }
      }}
    />
  );
};

export default JsonBrowser;
