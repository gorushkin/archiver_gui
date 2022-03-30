import { Button } from '@mui/material';
import { ipcRenderer } from 'electron';
import { useContext } from 'react';

import { Pages, StateContext, Modes } from '../../AppContext';

interface IClickHandler {
  (type: string, mode: Modes): void;
}

const Buttons = () => {
  const { setState, state } = useContext(StateContext);

  if (!state) throw new Error('There is an error with your state');

  type IBtn = { label: string; mode: Modes; type: string };

  const btns: IBtn[] = [
    { label: 'Pack File', mode: Modes.packFile, type: 'file' },
    { label: 'Pack Dir', mode: Modes.packDir, type: 'dir' },
    { label: 'Unpack', mode: Modes.unpack, type: 'file' },
  ];

  const clickHandler: IClickHandler = async (type, mode) => {
    const input = await ipcRenderer.invoke('btn_click', type);
    if (setState) {
      setState((state) => ({ ...state, input, page: Pages.tablePage, mode }));
    }
  };

  return (
    <ul className="main__btns-list">
      {btns.map(({ mode, type, label }, i) => {
        const isButtonActive = state.mode === mode;
        const className = isButtonActive ? 'btn btn--active' : 'btn';
        return (
          <li key={i} className="main__btns-item">
            <Button
              className={className}
              color="primary"
              onClick={clickHandler.bind(null, type, mode)}
              variant="contained"
            >
              {label}
            </Button>
          </li>
        );
      })}
    </ul>
  );
};

export { Buttons };
