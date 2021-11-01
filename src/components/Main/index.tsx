import './index.scss';
import styles from './Main.module.css';

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
    <main id="json-to-extraction-query">
      <div id="app-grid" className={styles.mainGrid}>
        <div id="app-json-browser" className={styles.browserContainer}>
          <JsonBrowser />
        </div>
        <div id="app-steps" className={styles.stepsContainer}>
          <StepsAccordion />
          <Actions onFinish={onFinish} />
        </div>
      </div>
    </main>
  );
};

export default Main;
