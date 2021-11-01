import './index.scss';

import React, { FC, useEffect } from 'react';

import { useAppDispatch } from '../../store/hooks';
import { initJson, JsonData } from '../../reducers/browserSlice';

import JsonBrowser from '../JsonBrowser';
import StepsAccordion from '../StepsAccordion';
import Actions from './Actions';
import { onFinishFunction } from '../App';

interface MainProps {
  json: JsonData;
  onFinish: onFinishFunction;
}

const Main: FC<MainProps> = ({ json, onFinish }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initJson(json));
  }, [json]);

  return (
    <main>
      <div id="app-grid" className="main-grid">
        <div id="app-json-browser" className="browser-container">
          <JsonBrowser />
        </div>
        <div id="app-steps" className="steps-container">
          <StepsAccordion />
          <Actions onFinish={onFinish} />
        </div>
      </div>
    </main>
  );
};

export default Main;
