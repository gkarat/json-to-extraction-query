import { JSONPath } from 'jsonpath-plus';
import * as React from 'react';
import {
  disableBrowser,
  resetBrowser,
  selectData,
  updateData,
} from '../redux/browserSlice';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  deferPath,
  resetPath,
  selectJsonPath,
  selectNodes,
  selectSubmitted,
  submitPath,
  updateNodes,
} from '../redux/pathSlice';
import Chip from './Chip/Chip';

const PathSelectionPrompt = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const pathNodes = useAppSelector(selectNodes);
  const path = useAppSelector(selectJsonPath);
  const pathSubmitted = useAppSelector(selectSubmitted);
  const data = useAppSelector(selectData);
  const [totalMatch, setTotalMatch] = React.useState(0);
  React.useEffect(() => {
    setTotalMatch(JSONPath({ path, json: data }).length);
  }, [path, data]);
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        alignItems: 'center',
      }}
    >
      {pathNodes.map((n, i) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
          key={i}
        >
          <Chip
            value={String(n)}
            onEdit={(e) => {
              e.preventDefault();
              const nodes: Array<string | number> = [...pathNodes];
              nodes[i] = (e.target as HTMLInputElement).value;
              dispatch(updateNodes(nodes));
            }}
            onDelete={(e) => {
              e.preventDefault();
              const nodes: Array<string | number> = [...pathNodes];
              nodes.splice(i, 1);
              dispatch(updateNodes(nodes));
            }}
            editable={!pathSubmitted}
          />
          {pathNodes.length !== 1 && i !== pathNodes.length - 1 ? (
            <span>/</span>
          ) : (
            ''
          )}
        </div>
      ))}
      <button
        name="add-chip"
        style={{ width: 'fix-content', height: 'fit-content' }}
        onClick={(e) => {
          e.preventDefault();
          dispatch(updateNodes([...pathNodes, '']));
        }}
      >
        Add
      </button>
      <div
        style={{
          position: 'absolute',
          bottom: '1rem',
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        <button
          type="button"
          onClick={() => {
            dispatch(submitPath());
            dispatch(disableBrowser());
            dispatch(updateData(JSONPath({ path, json: data })));
          }}
          disabled={pathSubmitted || (!pathSubmitted && path === '$.')}
        >
          Submit
        </button>
        <button
          type="reset"
          onClick={() => {
            dispatch(deferPath());
            dispatch(resetBrowser());
          }}
        >
          Defer
        </button>
        <button
          type="reset"
          onClick={() => {
            dispatch(resetPath());
            dispatch(resetBrowser());
          }}
        >
          Reset
        </button>
        <span>Matched {path === '$.' ? 0 : totalMatch} items</span>
      </div>
    </div>
  );
};

export default PathSelectionPrompt;
