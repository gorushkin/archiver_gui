import { Pages } from '../AppContext';

import { StartPage } from './StartPage';
import { TablePage } from './TablePage/TablePage';

type TypeMapping = Record<string, Function>;

const pageMapping: TypeMapping = {
  [Pages.startPage]: StartPage,
  [Pages.tablepage]: TablePage,
};

export const renderPage = (name: string) => {
  if (!pageMapping[name]) throw new Error(`There is no page with ${name} name`);
  return pageMapping[name];
};
