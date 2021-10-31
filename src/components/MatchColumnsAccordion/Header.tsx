import styles from '../StepsAccordion/StepsAccordion.module.css';

import HintIcon from '../../public/hint.svg';
import MarkIcon from '../../public/mark.svg';
import { AccordionButton } from '@reach/accordion';
import { JSONPath } from 'jsonpath-plus';
import React, { ReactElement } from 'react';
import { resetJson, selectJson, updateJson } from '../../reducers/browserSlice';

import { deferPath } from '../../reducers/pathSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectColumnsPaths, selectOpen } from '../../reducers/columnsSlice';

const MatchColumnsHeader = (): ReactElement => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectJson);
  const columns = useAppSelector(selectColumnsPaths);
  const open = useAppSelector(selectOpen);

  const notEmpty = columns?.length > 0;
  const completed = notEmpty && columns.every((n) => n.length > 0);

  // remove path nodes and refresh json browser
  const onReset = () => {
    dispatch(deferPath());
    dispatch(resetJson());
  };

  const onPreview = () => {
    data &&
      dispatch(
        updateJson(
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
            <p>
              Add or remove path items to compose a JSON path that will be run
              against the JSON file.
            </p>
            <p>
              Each path item can either be an index, key, or wildcard matching
              all descendant items (items of arrays or values of dictionary).
              Use JSON browser (to the left) to select required items quickly.
            </p>
          </div>
        </details>
        <button className={styles.reset} type="reset" onClick={onReset}>
          Reset
        </button>
        <button className={styles.preview} type="button" onClick={onPreview}>
          Preview result
        </button>
      </div>
    </div>
  );
};

export default MatchColumnsHeader;
