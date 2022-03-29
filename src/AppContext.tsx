import { useState, createContext, FC, ReactNode } from 'react';

export enum Pages {
  startPage = 'startPage',
  secondPage = 'packFilePage',
}

interface IState {
  input: string;
  output: string;
  name: string;
  page: Pages;
}

interface GlobalState {
  state: IState | null;
  setState: React.Dispatch<React.SetStateAction<IState>> | null;
}

interface ProviderProps {
  children: ReactNode;
}

export const StateContext = createContext<GlobalState>({ state: null, setState: null });

const StateProvider: FC<ProviderProps> = ({ children }) => {
  const [state, setState] = useState<IState>({
    input: '',
    output: '',
    name: '',
    page: Pages.startPage,
  });

  return <StateContext.Provider value={{ state, setState }}>{children}</StateContext.Provider>;
};

export default StateProvider;
