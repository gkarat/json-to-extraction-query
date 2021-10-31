import React, { ReactElement } from 'react';
import { AccordionItem, AccordionPanel } from '@reach/accordion';

import { useAppSelector } from '../../store/hooks';
import { selectSubmitted } from '../../reducers/pathSlice';
import MatchObjectsHeader from './Header';
import MatchObjectsContent from './Content';

const MatchObjectsAccordion = (): ReactElement => {
  return (
    <div id="match-objects-accordion">
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
