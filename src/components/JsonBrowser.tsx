import React, { useEffect } from 'react';
import JSONEditor, {
  EditableNode,
  FieldEditable,
  JSONEditorMode,
  SelectionPosition,
} from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  fromNodesToJsonPath,
  selectNodes,
  selectSubmitted as selectPathSubmitted,
  updateNodes,
} from '../redux/pathSlice';
import { enableBrowser, selectBrowserDisabled } from '../redux/browserSlice';
import { JSONPath } from 'jsonpath-plus';

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
  const pathNodes = useAppSelector(selectNodes);
  const pathSubmitted = useAppSelector(selectPathSubmitted);

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
      },
      onEvent: (node: EditableNode, event: any) => {
        if (event.type === 'click') {
          dispatch(updateNodes(node.path));
        }
      },
    };

    if (pathSubmitted) {
      jsoneditor = new JSONEditor(
        container,
        options,
        JSONPath({ path: fromNodesToJsonPath(pathNodes), json: json })
      );
    } else {
      jsoneditor = new JSONEditor(container, options, json);
    }
    return () => {
      jsoneditor.destroy();
    };
  }, [pathSubmitted]);

  useEffect(() => {
    console.log(jsoneditor);
    if (jsoneditor) {
      //jsoneditor.refresh();
    }
  }, [pathNodes]);

  return (
    <div
      className="jsoneditor-react-container"
      style={{
        height: '100%',
        pointerEvents: disabled ? 'none' : 'auto',
        opacity: disabled ? '0.5' : '1',
      }}
      ref={(elem) => (container = elem as HTMLDivElement)}
    />
  );
};

export default JsonBrowser;
