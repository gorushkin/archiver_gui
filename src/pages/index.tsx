import { PackFilePage } from './PackFilePage';
import { StartPage } from './StartPage';

type TypeMapping = Record<string, Function>;

const pageMapping: TypeMapping = {
  startPage: StartPage,
  packFilePage: PackFilePage,
};

export const renderPage = (name: string) => {
  if (!pageMapping[name]) throw new Error(`There is no page with ${name} name`);
  return pageMapping[name];
};
