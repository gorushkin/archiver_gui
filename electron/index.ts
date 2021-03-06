import { app, BrowserWindow, ipcMain, dialog } from 'electron';

import { Archiver, ArchiverError } from './archiver';
let window: Electron.BrowserWindow;

export enum Modes {
  packFile = 'packFile',
  packDir = 'packDir',
  unpack = 'unpack',
}

const isDev = process.env['NODE_MODE'] === 'dev';

const createWindow = () => {
  window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  window.loadURL('http://localhost:3000');
  window.webContents.openDevTools();
  window.showInactive();
  window.maximize();
};

// app.on('ready', createWindow);
app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit(); // exit
  }
});

enum selectTargetTypes {
  openFile = 'openFile',
  openDirectory = 'openDirectory',
}

const selectTarget = async (action: selectTargetTypes): Promise<string | undefined> => {
  const target = await dialog.showOpenDialog(window, {
    defaultPath: app.getPath('downloads'),
    properties: [action],
  });

  const [targetPath] = target.filePaths;
  return targetPath;
};

type TypeMapping = Record<string, Function>;

const typeMapping: TypeMapping = {
  file: selectTarget.bind(null, selectTargetTypes.openFile),
  dir: selectTarget.bind(null, selectTargetTypes.openDirectory),
};

ipcMain.handle('btn_click', async (_, type: string) => {
  if (!typeMapping[type]) throw new Error('There is no action with $type} name');
  return await typeMapping[type]();
});

type Options = {
  input: string;
  output: string;
  name: string;
  mode: Modes;
};

interface IArchverMethod {
  (input: string, output: string, name: string): Promise<string>;
}

const pack: IArchverMethod = (input, output, name) => Archiver.pack(input, output, { name });
const unpack: IArchverMethod = (input, output, name) => Archiver.unpack(input, output, { name });

type AppModeMapping = Record<string, Function>;

const appModeMapping: AppModeMapping = {
  [Modes.packDir]: pack,
  [Modes.packFile]: pack,
  [Modes.unpack]: unpack,
};

ipcMain.on('run', async (_, { input, output, name, mode }: Options) => {
  try {
    const result = await appModeMapping[mode](input, output, name);
    return result;
  } catch (error) {
    console.log('error: ', error);
    if (error instanceof ArchiverError) {
      const message = error.message;
      dialog.showMessageBox({
        title: 'OOps, there is an error',
        buttons: ['Dismiss'],
        type: 'warning',
        message,
      });
    } else {
      throw error;
    }
  }
});
