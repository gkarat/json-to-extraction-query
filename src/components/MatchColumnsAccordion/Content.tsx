import styles from './Content.module.css';

import React, { FC } from 'react';

import {
  Column,
  selectColumns,
  selectPaths,
  updateColumns,
} from '../../reducers/columnsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import CrossIcon from '../../public/cross.svg';

const MatchColumnsContent: FC = () => {
  const dispatch = useAppDispatch();
  const columns = useAppSelector(selectColumns);
  const paths = useAppSelector(selectPaths);

  const enable = paths.every((p) => p.length > 0);

  return (
    <div className="step-content">
      <div className={styles.activeColumns}>
        {columns.map((c: Column, i: number) => (
          <div key={i} className={styles.columnRow}>
            <div className={styles.columnName}>
              <strong>Name</strong>{' '}
              <input
                name="column-name"
                value={c.name}
                className={styles.input}
                type="text"
                onChange={(event) => {
                  event.preventDefault();
                  const updated = [...columns];
                  updated[i] = { ...updated[i], name: event.target.value };
                  dispatch(updateColumns(updated));
                }}
                placeholder="column name"
              />
            </div>
            <div className={styles.columnPath}>
              <strong>Path</strong>{' '}
              <input
                name="column-path"
                value={c.path}
                className={styles.input}
                type="text"
                onChange={(event) => {
                  event.preventDefault();
                  const updated = [...columns];
                  updated[i] = { ...updated[i], path: event.target.value };
                  dispatch(updateColumns(updated));
                }}
                placeholder="column path"
              />
            </div>
            <button
              className={styles.removeRow}
              onClick={(e) => {
                e.preventDefault();
                const updated = [...columns];
                updated.splice(i, 1);
                dispatch(updateColumns(updated));
              }}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          className={styles.addButton}
          name="add-column"
          onClick={(e) => {
            e.preventDefault();
            dispatch(updateColumns([...columns, { name: '', path: '' }]));
          }}
          disabled={!enable}
        >
          <img src={CrossIcon}></img>
        </button>
      </div>
    </div>
  );
};

export default MatchColumnsContent;
