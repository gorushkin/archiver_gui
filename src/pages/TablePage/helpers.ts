import { IState, Modes } from '../../AppContext';
import { Buttons, TableRow } from '../../components/Table/Table';

import { IBrowseHandler, IChangeHandler } from './useTablePage';

interface IGetTablesRows {
  (
    state: IState | null,
    mode: Modes,
    browseHandler: IBrowseHandler,
    changeHandler: IChangeHandler
  ): TableRow[];
}

export const getTableRows: IGetTablesRows = (state, mode, browseHandler, changeHandler) => [
  {
    name: 'input',
    caption: 'Input',
    value: state?.input,
    disabled: true,
    clickHandler: browseHandler,
    changeHandler: null,
    button: mode === 'packDir' ? Buttons.dir : Buttons.file,
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
