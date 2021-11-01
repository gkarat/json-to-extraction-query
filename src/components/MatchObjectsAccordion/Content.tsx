import React, { ReactElement, useEffect, useState } from 'react';
import { JSONPath } from 'jsonpath-plus';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  selectJsonPath,
  selectNodes,
  selectPreviewed,
  updateNodes,
} from '../../reducers/pathSlice';
import { selectJson } from '../../reducers/browserSlice';
import Chip from '../PathChip/Chip';
import CrossIcon from '../../public/cross.svg';

const MatchObjectsContent = (): ReactElement => {
  const dispatch = useAppDispatch();
  const pathNodes = useAppSelector(selectNodes);
  const path = useAppSelector(selectJsonPath);
  const data = useAppSelector(selectJson);
  const previewed = useAppSelector(selectPreviewed);
  const [totalMatch, setTotalMatch] = useState(0);

  useEffect(() => {
    !previewed && setTotalMatch(JSONPath({ path, json: data })?.length || 0);
  }, [path, data]);

  return (
    <div className="step-content">
      <div className="content-container">
        <div className="chips">
          {pathNodes.map((n, i) => (
            <div className="chip-container" key={i}>
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
              />
              {pathNodes.length !== 1 && i !== pathNodes.length - 1 ? (
                <span>/</span>
              ) : (
                ''
              )}
            </div>
          ))}
          <button
            className="add-button"
            name="add-chip"
            onClick={(e) => {
              e.preventDefault();
              dispatch(updateNodes([...pathNodes, '']));
            }}
          >
            <img src={CrossIcon}></img>
          </button>
        </div>
      </div>
      <div className="secondary-text">
        <span className="small-text">
          Matched <strong>{path === '$.' ? 0 : totalMatch}</strong> items.
          <br />
          Click “Preview result” to see the resulting objects.
        </span>
      </div>
    </div>
  );
};

export default MatchObjectsContent;
