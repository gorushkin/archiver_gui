import { useState, createContext, FC, ReactNode } from 'react';

export enum Pages {
  startPage = 'startPage',
  tablePage = 'tablePage',
}

export enum Modes {
  packFile = 'packFile',
  packDir = 'packDir',
  unpack = 'unpack',
}

export interface IState {
  input: string;
  output: string;
  name: string;
  page: Pages;
  mode: Modes;
}

interface GlobalState {
  state: IState | null;
  setState: React.Dispatch<React.SetStateAction<IState>> | null;
}

interface ProviderProps {
  children: ReactNode;
}

const initState: IState = {
  input: '/home/gorushkin/Webdev/archiver_gui/temp/target.txt',
  output: '/home/gorushkin/Webdev/archiver_gui/temp/output',
  name: 'qwe.zip',
  page: Pages.tablePage,
  mode: Modes.packFile,
};

const initState2: IState = {
  input: '/home/gorushkin/Webdev/archiver_gui/temp/output/target.zip',
  output: '/home/gorushkin/Webdev/archiver_gui/temp/output',
  name: 'qwe',
  page: Pages.tablePage,
  mode: Modes.unpack,
};

export const StateContext = createContext<GlobalState>({ state: null, setState: null });

const StateProvider: FC<ProviderProps> = ({ children }) => {
  const [state, setState] = useState<IState>(initState2);

  return <StateContext.Provider value={{ state, setState }}>{children}</StateContext.Provider>;
};

export default StateProvider;
