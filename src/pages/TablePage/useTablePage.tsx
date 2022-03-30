import { ipcRenderer } from 'electron';
import { useContext } from 'react';

import { Pages, StateContext, Modes } from '../../AppContext';

import { getTableRows } from './helpers';

export interface IBrowseHandler {
  (type: Modes, name: string): void;
}

export interface IChangeHandler {
  (name: string): void;
}

export const useTablePage = () => {
  const { state, setState } = useContext(StateContext);

  if (!state) throw new Error('Theere is something wrong with your state');

  const { input, output, mode, name } = state;

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

  const isFromReady = !!input && !!output && !!name;

  const onSubmitClickhandler = async () => {
    if (!isFromReady) {
      console.log('form is not ready');
      return;
    }
    const result = await ipcRenderer.send('run', {
      input,
      output,
      name,
      mode,
    });

    console.log('result: ', result);
  };

  const onResetClickhandler = () => {
    if (setState) {
      setState((state) => ({ ...state, input: '', output: '', name: '' }));
    }
  };

  const tableRows = getTableRows(state, mode, browseHandler, changeHandler);

  return { tableRows, onBackClickhandler, onResetClickhandler, onSubmitClickhandler };
};
