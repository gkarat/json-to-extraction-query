import { JSONPath } from 'jsonpath-plus';
import * as React from 'react';
import { selectData, updateData } from '../redux/browserSlice';
import {
  deferColumns,
  selectColumnsSubmitted,
  submitColumns,
  updateColumns,
  resetColumns,
  selectColumnsPaths,
} from '../redux/columnsSlice';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectSubmitted as selectPathSubmitted } from '../redux/pathSlice';
import Chip from './Chip/Chip';

interface ColumnSelectionPromptProps {
  disabled: boolean;
}

const ColumnSelectionPrompt = ({
  disabled,
}: ColumnSelectionPromptProps): React.ReactElement<ColumnSelectionPromptProps> => {
  const dispatch = useAppDispatch();
  const pathSubmitted = useAppSelector(selectPathSubmitted);
  const columnsSubmitted = useAppSelector(selectColumnsSubmitted);
  const columns = useAppSelector(selectColumnsPaths);
  const data = useAppSelector(selectData);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          alignItems: 'center',
        }}
      >
        {columns.map((n, i) => (
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
                const nodes: Array<string> = [...columns];
                nodes[i] = (e.target as HTMLInputElement).value;
                dispatch(updateColumns(nodes));
              }}
              onDelete={(e) => {
                e.preventDefault();
                const nodes: Array<string> = [...columns];
                nodes.splice(i, 1);
                dispatch(updateColumns(nodes));
              }}
              editable={!disabled && !pathSubmitted}
            />
            {columns.length !== 1 && i !== columns.length - 1 ? (
              <span>,</span>
            ) : (
              ''
            )}
          </div>
        ))}
        <button
          name="add-chip"
          style={{ width: 'fix-content', height: 'fit-content' }}
          disabled={disabled}
          onClick={(e) => {
            e.preventDefault();
            dispatch(updateColumns([...columns, '']));
          }}
        >
          Add
        </button>
      </div>
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
            dispatch(submitColumns());
            data &&
              dispatch(
                updateData(
                  // @ts-ignore
                  data.map((i: any) => {
                    const cols: any = [];
                    columns.forEach((c) => {
                      cols.push(JSONPath({ path: '$.' + c, json: i }));
                    });
                    return cols.flat();
                  })
                )
              );
          }}
          disabled={disabled || columnsSubmitted}
        >
          Submit
        </button>
        <button
          type="reset"
          onClick={() => dispatch(deferColumns())}
          disabled={disabled}
        >
          Defer
        </button>
        <button
          type="reset"
          onClick={() => dispatch(resetColumns())}
          disabled={disabled}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default ColumnSelectionPrompt;
