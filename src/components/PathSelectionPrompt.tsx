import { JSONPath } from 'jsonpath-plus';
import React, { useEffect, useState } from 'react';
import {
  disableBrowser,
  resetJson,
  selectJson,
  updateJson,
} from '../reducers/browserSlice';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  deferPath,
  resetPath,
  selectJsonPath,
  selectNodes,
  selectSubmitted,
  submitPath,
  updateNodes,
} from '../reducers/pathSlice';
import Chip from './Chip/Chip';

const PathSelectionPrompt = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const pathNodes = useAppSelector(selectNodes);
  const path = useAppSelector(selectJsonPath);
  const pathSubmitted = useAppSelector(selectSubmitted);
  const data = useAppSelector(selectJson);
  const [totalMatch, setTotalMatch] = useState(0);

  useEffect(() => {
    setTotalMatch(JSONPath({ path, json: data })?.length || 0);
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
            dispatch(updateJson(JSONPath({ path, json: data })));
          }}
          disabled={pathSubmitted || (!pathSubmitted && path === '$.')}
        >
          Submit
        </button>
        <button
          type="reset"
          onClick={() => {
            dispatch(deferPath());
            dispatch(resetJson());
          }}
        >
          Defer
        </button>
        <button
          type="reset"
          onClick={() => {
            dispatch(resetPath());
            dispatch(resetJson());
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
