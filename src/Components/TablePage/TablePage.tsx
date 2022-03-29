import { Button } from '@mui/material';
import { ipcRenderer } from 'electron';
import { FC, useContext } from 'react';

import { StateContext } from '../../AppContext';
import { Buttons, Table, TableRow } from '../Table/Table';

export enum TableTypes {
  packFile = 'packFile',
  packDir = 'packDir',
  unpack = 'unpack',
}

interface TablePageProps {
  type: TableTypes;
}

const TablePage: FC<TablePageProps> = ({ type }) => {
  const { state, setState } = useContext(StateContext);

  const browseHandler = async (type: TableTypes, name: string) => {
    console.log('type: ', type);
    const result = await ipcRenderer.invoke('btn_click', type);
    if (setState) {
      setState((state) => ({ ...state, [name]: result }));
    }
  };

  const changeHandler = (name: string) => {
    if (setState) {
      setState((state) => ({ ...state, name }));
    }
  };

  const isFromReady = !!state?.input && !!state.output && !!state.name;

  const onSubmitClickhandler = () => {
    if (!isFromReady) {
      console.log('form is not ready');
      return;
    }
  };

  const onResetClickhandler = () => {
    if (setState) {
      setState((state) => ({ ...state, input: '', output: '', name: '' }));
    }
  };

  const tableRows: TableRow[] = [
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

  return (
    <div className="main__page">
      <Table items={tableRows} type={type} />
      <div className="main__row">
        <Button
          className="main__button main__button--submit"
          variant="contained"
          color="error"
          onClick={onResetClickhandler}
        >
          Back
        </Button>
        <Button
          className="main__button main__button--submit"
          variant="contained"
          color="error"
          onClick={onResetClickhandler}
        >
          Reset
        </Button>
        <Button
          onClick={onSubmitClickhandler}
          className="main__button main__button--submit"
          variant="contained"
        >
          Pack
        </Button>
      </div>
    </div>
  );
};

export { TablePage };
