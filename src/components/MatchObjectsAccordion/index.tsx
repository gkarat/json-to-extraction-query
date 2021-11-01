import './index.scss';

import React, { ReactElement } from 'react';
import { AccordionItem, AccordionPanel } from '@reach/accordion';

import MatchObjectsHeader from './Header';
import MatchObjectsContent from './Content';

const MatchObjectsAccordion = (): ReactElement => {
  return (
    <div className="step-container" id="match-objects-accordion">
      <AccordionItem>
        <MatchObjectsHeader />
        <AccordionPanel>
          <MatchObjectsContent />
        </AccordionPanel>
      </AccordionItem>
    </div>
  );
};

export default MatchObjectsAccordion;
