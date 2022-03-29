import { IState } from '../../AppContext';
import { Buttons, TableRow } from '../Table/Table';

import { IBrowseHandler, IChangeHandler, TableTypes } from './useTablePage';

interface IGetTablesRows {
  (
    state: IState | null,
    type: TableTypes,
    browseHandler: IBrowseHandler,
    changeHandler: IChangeHandler
  ): TableRow[];
}

export const getTableRows: IGetTablesRows = (state, type, browseHandler, changeHandler) => [
  {
    name: 'input',
    caption: 'Input',
    value: state?.input,
    disabled: true,
    clickHandler: browseHandler,
    changeHandler: null,
    button: type === 'packDir' ? Buttons.dir : Buttons.file,
  },
  {
    name: 'output',
    caption: 'Output',
    value: state?.output,
    disabled: true,
    clickHandler: browseHandler,
    changeHandler: null,
    button: Buttons.dir,
  },
  {
    name: 'name',
    caption: 'Name',
    value: state?.name,
    disabled: false,
    clickHandler: null,
    changeHandler: changeHandler,
  },
];
