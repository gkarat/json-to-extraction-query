import HintIcon from '../../public/hint.svg';
import MarkIcon from '../../public/mark.svg';
import { AccordionButton } from '@reach/accordion';
import { JSONPath } from 'jsonpath-plus';
import React, { ReactElement } from 'react';
import { selectInitJson, updateJson } from '../../reducers/browserSlice';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  resetColumns,
  selectColumns,
  selectOpen,
  updatePreviewed,
} from '../../reducers/columnsSlice';
import { selectJsonPath, selectNodes } from '../../reducers/pathSlice';
import {
  columnsCorrect,
  columnsNotEmpty,
  pathCorrect,
} from '../../helpers/helpers';

const MatchColumnsHeader = (): ReactElement => {
  const dispatch = useAppDispatch();
  const columns = useAppSelector(selectColumns);
  const open = useAppSelector(selectOpen);
  const jsonPath = useAppSelector(selectJsonPath);
  const jsonPathNodes = useAppSelector(selectNodes);
  const initJson = useAppSelector(selectInitJson);
  const notEmpty = columnsNotEmpty(columns);
  const completed = pathCorrect(jsonPathNodes) && columnsCorrect(columns);

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
    <div className="step-header">
      <div>
        <div className="left">
          <AccordionButton className="accordion-button">
            <i className={`arrow ${open ? 'arrow--down' : 'arrow--right'}`} />
          </AccordionButton>
          <h2>Step 2: Match columns</h2>
          <img className={`${!completed ? ' hidden' : ''}`} src={MarkIcon} />
        </div>
      </div>
      <div className="actions">
        <details data-popover="down">
          <summary className="hint-summary">
            <img className="hint" src={HintIcon} />
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
        <button type="reset" onClick={onReset} disabled={!notEmpty}>
          Reset
        </button>
        <button type="button" onClick={onPreview} disabled={!completed}>
          Preview result
        </button>
      </div>
    </div>
  );
};

export default MatchColumnsHeader;
