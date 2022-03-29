import { ipcRenderer } from 'electron';

export const clickHandler = async (type: string) => {
  const result = await ipcRenderer.invoke('btn_click', type);
  return result;
};
