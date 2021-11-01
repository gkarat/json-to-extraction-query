import { Column } from '../reducers/columnsSlice';
import { PathNodes } from '../reducers/pathSlice';

export const columnsNotEmpty = (columns: Column[]): boolean =>
  columns.length > 0;
export const columnsCorrect = (columns: Column[]): boolean =>
  columnsNotEmpty(columns) &&
  columns.every((c) => c.path.length > 0 && c.name.length > 0);
export const pathNonEmpty = (path: PathNodes): boolean => path.length > 0;
export const pathCorrect = (path: PathNodes): boolean =>
  pathNonEmpty(path) &&
  path.every((n) => typeof n === 'number' || n.length > 0);
export const queryCorrect = (path: PathNodes, columns: Column[]): boolean =>
  pathCorrect(path) && columnsCorrect(columns);
