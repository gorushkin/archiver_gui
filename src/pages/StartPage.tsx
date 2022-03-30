import { Button } from '@mui/material';
import { ipcRenderer } from 'electron';
import { useContext } from 'react';

import { Pages, StateContext } from '../AppContext';

const StartPage = () => {
  const { setState } = useContext(StateContext);

  const clickHandler = async (type: string, page: Pages) => {
    const input = await ipcRenderer.invoke('btn_click', type);
    if (setState) {
      setState((state) => ({ ...state, input, page }));
    }
  };

  return (
    <ul className="main__btns-list">
      <li className="main__btns-item">
        <Button onClick={clickHandler.bind(null, 'file', Pages.packFilePage)} variant="contained">
          Pack File
        </Button>
      </li>
      <li className="main__btns-item">
        <Button onClick={clickHandler.bind(null, 'dir', Pages.packDirPage)} variant="contained">
          Pack Dir
        </Button>
      </li>
      <li className="main__btns-item">
        <Button onClick={clickHandler.bind(null, 'file', Pages.unpackPage)} variant="contained">
          Unpack
        </Button>
      </li>
    </ul>
  );
};

export { StartPage };
