import styles from '../StepsAccordion/index.module.css';

import React, { ReactElement } from 'react';
import { AccordionItem, AccordionPanel } from '@reach/accordion';

import MatchColumnsHeader from './Header';
import MatchColumnsContent from './Content';

const MatchColumnsAccordion = (): ReactElement => {
  return (
    <div className={styles.stepContainer} id="match-columns-accordion">
      <AccordionItem>
        <MatchColumnsHeader />
        <AccordionPanel>
          <MatchColumnsContent />
        </AccordionPanel>
      </AccordionItem>
    </div>
  );
};

export default MatchColumnsAccordion;
