import { Button } from '@mui/material';
import { ipcRenderer } from 'electron';
import { useContext } from 'react';

import { Pages, StateContext, Modes } from '../AppContext';

interface IClickHandler {
  (type: string, mode: Modes): void;
}

const StartPage = () => {
  const { setState } = useContext(StateContext);

  const clickHandler: IClickHandler = async (type, mode) => {
    const input = await ipcRenderer.invoke('btn_click', type);
    if (setState) {
      setState((state) => ({ ...state, input, page: Pages.tablepage, mode }));
    }
  };

  return (
    <ul className="main__btns-list">
      <li className="main__btns-item">
        <Button onClick={clickHandler.bind(null, 'file', Modes.packFile)} variant="contained">
          Pack File
        </Button>
      </li>
      <li className="main__btns-item">
        <Button onClick={clickHandler.bind(null, 'dir', Modes.packDir)} variant="contained">
          Pack Dir
        </Button>
      </li>
      <li className="main__btns-item">
        <Button onClick={clickHandler.bind(null, 'file', Modes.unpack)} variant="contained">
          Unpack
        </Button>
      </li>
    </ul>
  );
};

export { StartPage };
