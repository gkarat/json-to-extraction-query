import styles from '../StepsAccordion/StepsAccordion.module.css';

import React, { ReactElement } from 'react';
import { JSONPath } from 'jsonpath-plus';
import { AccordionButton } from '@reach/accordion';

import HintIcon from '../../public/hint.svg';
import MarkIcon from '../../public/mark.svg';

import { resetJson, selectJson, updateJson } from '../../reducers/browserSlice';
import {
  resetPath,
  selectJsonPath,
  selectNodes,
  selectOpen,
} from '../../reducers/pathSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const MatchObjectsHeader = (): ReactElement => {
  const jsonPath = useAppSelector(selectJsonPath);
  const jsonPathNodes = useAppSelector(selectNodes);
  const browserJson = useAppSelector(selectJson);
  const open = useAppSelector(selectOpen);

  const notEmpty = jsonPathNodes?.length > 0;
  const completed =
    notEmpty &&
    jsonPathNodes.every((n) => typeof n === 'number' || n.length > 0);
  const dispatch = useAppDispatch();

  // remove path nodes and refresh json browser
  const onReset = () => {
    dispatch(resetPath());
    dispatch(resetJson());
  };

  // execute JSONPath parser and refresh json browser with the result
  const onPreview = () => {
    dispatch(updateJson(JSONPath({ path: jsonPath, json: browserJson })));
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
          <h2>Step 1: Match objects</h2>
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
          disabled={!notEmpty}
        >
          Preview result
        </button>
      </div>
    </div>
  );
};

export default MatchObjectsHeader;
