import * as React from 'react';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectNodes, selectSubmitted, updateNodes } from '../redux/pathSlice';
import Chip from './Chip/Chip';

const PathSelectionPrompt = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const pathNodes = useAppSelector(selectNodes);
  const pathSubmitted = useAppSelector(selectSubmitted);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
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
              nodes[i] = (e.target as HTMLSpanElement).innerHTML;
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
    </div>
  );
};

export default PathSelectionPrompt;
