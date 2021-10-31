import styles from './index.module.css';
import CrossIcon from '../../public/cross.svg';
import React, { ReactElement, useEffect, useState } from 'react';
import { JSONPath } from 'jsonpath-plus';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  selectJsonPath,
  selectNodes,
  selectSubmitted,
  updateNodes,
} from '../../reducers/pathSlice';
import { selectJson } from '../../reducers/browserSlice';
import Chip from '../Chip/Chip';

const MatchObjectsContent = (): ReactElement => {
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
    <div>
      <div className={styles.contentContainer}>
        <div className={styles.chips}>
          {pathNodes.map((n, i) => (
            <div className={styles.chipContainer} key={i}>
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
            className={styles.addButton}
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
      <div className={styles.secondaryText}>
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
