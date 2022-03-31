import { Pages } from '../AppContext';

import { TablePage } from './TablePage/TablePage';

type TypeMapping = Record<string, () => JSX.Element>;

const pageMapping: TypeMapping = {
  [Pages.tablePage]: TablePage,
};

export const renderPage = (name: string) => {
  if (!pageMapping[name]) throw new Error(`There is no page with ${name} name`);
  return pageMapping[name];
};
