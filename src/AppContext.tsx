import { useState, createContext, FC, ReactNode } from 'react';

export enum Pages {
  startPage = 'startPage',
  tablepage = 'tablepage',
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
  mode: Modes | null;
}

interface GlobalState {
  state: IState | null;
  setState: React.Dispatch<React.SetStateAction<IState>> | null;
}

interface ProviderProps {
  children: ReactNode;
}

// const testInitState: IState = {
//   input: '/home/gorushkin/Downloads/20220208_082255.jpg',
//   output: '/home/gorushkin/Desktop',
//   name: 'archive.zip',
//   page: Pages.tablepage,
//   mode: Modes.packFile
// };

const initState: IState = {
  input: '',
  output: '',
  name: '',
  page: Pages.startPage,
  mode: null,
};

export const StateContext = createContext<GlobalState>({ state: null, setState: null });

const StateProvider: FC<ProviderProps> = ({ children }) => {
  const [state, setState] = useState<IState>(initState);

  return <StateContext.Provider value={{ state, setState }}>{children}</StateContext.Provider>;
};

export default StateProvider;
