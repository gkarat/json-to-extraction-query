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
  updatePreviewed,
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
    dispatch(updatePreviewed(false));
    dispatch(resetPath());
    dispatch(resetJson());
  };

  // execute JSONPath parser and refresh json browser with the result
  const onPreview = () => {
    dispatch(updatePreviewed(true));
    dispatch(updateJson(JSONPath({ path: jsonPath, json: browserJson })));
  };

  return (
    <div className="step-header">
      <div>
        <div className="left">
          <AccordionButton className="accordion-button">
            <i className={`arrow ${open ? 'arrow--down' : 'arrow--right'}`} />
          </AccordionButton>
          <h2>Step 1: Match objects</h2>
          <img
            className={`hint` + (!completed ? ' hidden' : '')}
            src={MarkIcon}
          />
        </div>
      </div>
      <div className="actions">
        <details data-popover="down">
          <summary className="hint-summary">
            <img className="hint" src={HintIcon} />
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
          className="reset"
          type="reset"
          onClick={onReset}
          disabled={!notEmpty}
        >
          Reset
        </button>
        <button
          className="preview"
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
