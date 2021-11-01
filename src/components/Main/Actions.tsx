import React, { FC } from 'react';

import { onFinishFunction, OutputQuery } from '../App';
import { Column, selectColumns } from '../../reducers/columnsSlice';
import { useAppSelector } from '../../store/hooks';
import { selectJsonPath } from '../../reducers/pathSlice';

interface ActionsProps {
  onFinish: onFinishFunction;
}

const generateResultQuery = (
  jsonPath: string,
  columns: Column[]
): OutputQuery => ({
  path: jsonPath,
  columnPaths: columns.map((c) => c.path),
  columnNames: columns.map((c) => c.name),
});

const Actions: FC<ActionsProps> = ({ onFinish }) => {
  const jsonPath = useAppSelector(selectJsonPath);
  const columns = useAppSelector(selectColumns);

  const onCopy = async () => {
    await navigator.clipboard.writeText(
      JSON.stringify(generateResultQuery(jsonPath, columns))
    );
  };

  const onFinishApp = () => {
    onFinish(generateResultQuery(jsonPath, columns));
  };

  return (
    <div className="actions-menu">
      <button onClick={onCopy}>Copy result query</button>
      <button onClick={onFinishApp}>Finish</button>
    </div>
  );
};

export default Actions;
