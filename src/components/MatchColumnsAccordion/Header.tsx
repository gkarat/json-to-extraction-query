import styles from '../StepsAccordion/Header.module.css';

import HintIcon from '../../public/hint.svg';
import MarkIcon from '../../public/mark.svg';
import { AccordionButton } from '@reach/accordion';
import { JSONPath } from 'jsonpath-plus';
import React, { ReactElement } from 'react';
import {
  selectInitJson,
  selectJson,
  updateJson,
} from '../../reducers/browserSlice';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  Column,
  resetColumns,
  selectColumns,
  selectOpen,
  updatePreviewed,
} from '../../reducers/columnsSlice';
import { selectJsonPath } from '../../reducers/pathSlice';

const MatchColumnsHeader = (): ReactElement => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectJson);
  const columns = useAppSelector(selectColumns);
  const open = useAppSelector(selectOpen);
  const jsonPath = useAppSelector(selectJsonPath);
  const initJson = useAppSelector(selectInitJson);

  const notEmpty = columns?.length > 0;
  const completed = notEmpty && columns.every((n: Column) => n.path.length > 0);

  // remove path nodes and refresh json browser
  const onReset = () => {
    dispatch(updatePreviewed(false));
    dispatch(resetColumns());
  };

  const onPreview = () => {
    dispatch(updatePreviewed(true));
    const matched = JSONPath({ path: jsonPath, json: initJson });
    matched &&
      dispatch(
        updateJson(
          // @ts-ignore
          matched.map((item: any) => {
            const cols: any = [];
            columns.forEach((c) => {
              cols.push(JSONPath({ path: '$.' + c.path, json: item }));
            });
            return cols.flat();
          })
        )
      );
  };

  return (
    <div className={styles.accHeader}>
      <div>
        <div className={styles.left}>
          <AccordionButton className={styles.accordionButton}>
            <i
              className={`${styles.arrow} ${
                open ? styles.arrowDown : styles.arrowRight
              }`}
            />
          </AccordionButton>
          <h2>Step 2: Match columns</h2>
          <img
            className={`${styles.hint}` + (!completed ? ' hidden' : '')}
            src={MarkIcon}
          />
        </div>
      </div>
      <div className={styles.actions}>
        <details data-popover="down">
          <summary className={styles.hintSummary}>
            <img className={styles.hint} src={HintIcon} />
          </summary>
          <div>
            <p>Add or remove columns.</p>
            <p>
              Each column must contain its name and also an extraction path. The
              extraction path tells which value should be extracted from each
              matched object (step 1).
            </p>
          </div>
        </details>
        <button
          className={styles.reset}
          type="reset"
          onClick={onReset}
          disabled={!notEmpty}
        >
          Reset
        </button>
        <button
          className={styles.preview}
          type="button"
          onClick={onPreview}
          disabled={!completed}
        >
          Preview result
        </button>
      </div>
    </div>
  );
};

export default MatchColumnsHeader;
