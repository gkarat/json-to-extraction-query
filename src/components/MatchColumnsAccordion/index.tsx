import './index.scss';

import React, { ReactElement } from 'react';
import { AccordionItem, AccordionPanel } from '@reach/accordion';

import MatchColumnsHeader from './Header';
import MatchColumnsContent from './Content';

const MatchColumnsAccordion = (): ReactElement => {
  return (
    <div className="step-container" id="match-columns-accordion">
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
