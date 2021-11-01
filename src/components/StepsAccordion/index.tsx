import './index.scss';

import React, { FC } from 'react';
import { Accordion } from '@reach/accordion';

import MatchObjectsAccordion from '../MatchObjectsAccordion';
import { toggleOpen as toggleOpenFirst } from '../../reducers/pathSlice';
import { toggleOpen as toggleOpenSecond } from '../../reducers/columnsSlice';

import { useAppDispatch } from '../../store/hooks';
import MatchColumnsAccordion from '../MatchColumnsAccordion';

const StepsAccordion: FC = () => {
  const dispatch = useAppDispatch();

  return (
    <Accordion
      id="steps-accordion"
      collapsible
      defaultIndex={0}
      onChange={(index) =>
        index === 0 ? dispatch(toggleOpenFirst()) : dispatch(toggleOpenSecond())
      }
      multiple
    >
      <MatchObjectsAccordion />
      <MatchColumnsAccordion />
    </Accordion>
  );
};

export default StepsAccordion;
