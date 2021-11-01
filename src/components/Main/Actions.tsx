import React, { FC } from 'react';

import { onFinishFunction, OutputQuery } from '../App';
import {
  Column,
  selectColumns,
  selectPreviewed as selectPreviewedColumns,
} from '../../reducers/columnsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  selectJsonPath,
  selectNodes,
  selectPreviewed as selectPreviewedPath,
  updatePreviewed as updatePreviewedPath,
} from '../../reducers/pathSlice';
import { updatePreviewed as updatePreviewedColumns } from '../../reducers/columnsSlice';
import { resetJson } from '../../reducers/browserSlice';
import { queryCorrect } from '../../helpers/helpers';

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
  const dispatch = useAppDispatch();
  const jsonPath = useAppSelector(selectJsonPath);
  const jsonPathNodes = useAppSelector(selectNodes);
  const columns = useAppSelector(selectColumns);
  const pathPreviwed = useAppSelector(selectPreviewedPath);
  const columnsPreviewed = useAppSelector(selectPreviewedColumns);
  const originalEnabled = pathPreviwed || columnsPreviewed;
  const finishActionsEnabled = queryCorrect(jsonPathNodes, columns);

  const onCopy = async () => {
    await navigator.clipboard.writeText(
      JSON.stringify(generateResultQuery(jsonPath, columns))
    );
  };

  const onFinishApp = () => {
    onFinish(generateResultQuery(jsonPath, columns));
  };

  const onViewOriginal = () => {
    dispatch(resetJson());
    dispatch(updatePreviewedColumns(false));
    dispatch(updatePreviewedPath(false));
  };

  return (
    <div className="actions-menu">
      <button onClick={onViewOriginal} disabled={!originalEnabled}>
        View original
      </button>
      <div className="actions-menu__right">
        <button onClick={onCopy} disabled={!finishActionsEnabled}>
          Copy result query
        </button>
        <button onClick={onFinishApp} disabled={!finishActionsEnabled}>
          Finish
        </button>
      </div>
    </div>
  );
};

export default Actions;
