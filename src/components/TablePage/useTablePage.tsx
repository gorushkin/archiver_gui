import { ipcRenderer } from 'electron';
import { useContext } from 'react';

import { Pages, StateContext } from '../../AppContext';

import { getTableRows } from './helpers';

export enum TableTypes {
  packFile = 'packFile',
  packDir = 'packDir',
  unpack = 'unpack',
}

export interface IBrowseHandler {
  (type: TableTypes, name: string): void;
}

export interface IChangeHandler {
  (name: string): void;
}

interface UseTablePageProps {
  type: TableTypes;
}

export const useTablePage = (type: TableTypes) => {
  const { state, setState } = useContext(StateContext);

  const onBackClickhandler = () => {
    if (setState) {
      setState((state) => ({ ...state, page: Pages.startPage }));
    }
  };

  const browseHandler: IBrowseHandler = async (type, name) => {
    const result = await ipcRenderer.invoke('btn_click', type);
    if (setState) {
      setState((state) => ({ ...state, [name]: result }));
    }
  };

  const changeHandler: IChangeHandler = (name: string) => {
    if (setState) {
      setState((state) => ({ ...state, name }));
    }
  };

  const isFromReady = !!state?.input && !!state.output && !!state.name;

  const onSubmitClickhandler = async () => {
    if (!isFromReady) {
      console.log('form is not ready');
      return;
    }
    const result = await ipcRenderer.send('run', {
      input: state.input,
      output: state.output,
      name: state.name,
    });

    console.log('result: ', result);
  };

  const onResetClickhandler = () => {
    if (setState) {
      setState((state) => ({ ...state, input: '', output: '', name: '' }));
    }
  };

  const tableRows = getTableRows(state, type, browseHandler, changeHandler);

  return { tableRows, onBackClickhandler, onResetClickhandler, onSubmitClickhandler };
};
