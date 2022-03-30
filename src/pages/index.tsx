import { Pages } from '../AppContext';

import { PackDirPage } from './PackDirPage';
import { PackFilePage } from './PackFilePage';
import { StartPage } from './StartPage';
import { UnpackPage } from './UnpackPage';

type TypeMapping = Record<string, Function>;

const pageMapping: TypeMapping = {
  [Pages.startPage]: StartPage,
  [Pages.packFilePage]: PackFilePage,
  [Pages.packDirPage]: PackDirPage,
  [Pages.unpackPage]: UnpackPage,
};

export const renderPage = (name: string) => {
  if (!pageMapping[name]) throw new Error(`There is no page with ${name} name`);
  return pageMapping[name];
};
