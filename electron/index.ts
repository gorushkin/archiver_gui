import { app, BrowserWindow, ipcMain, dialog } from 'electron';

import { Archiver, ArchiverError } from './archiver';
let window: Electron.BrowserWindow;

export enum Modes {
  packFile = 'packFile',
  packDir = 'packDir',
  unpack = 'unpack',
}

export enum Operations {
  file = 'file',
  dir = 'dir',
}

enum selectTargetTypes {
  openFile = 'openFile',
  openDirectory = 'openDirectory',
}

interface IOptions {
  input: string;
  output: string;
  name: string;
  mode: Modes;
}

type TypeMapping = Record<Operations, Function>;

interface IArchverMethod {
  (input: string, output: string, name: string): Promise<string>;
}

type AppModeMapping = Record<Modes, Function>;

// const isDev = process.env['NODE_MODE'] === 'dev';

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

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit(); // exit
  }
});

const selectTarget = async (action: selectTargetTypes): Promise<string | undefined> => {
  const target = await dialog.showOpenDialog(window, {
    defaultPath: app.getPath('downloads'),
    properties: [action],
  });

  const [targetPath] = target.filePaths;
  return targetPath;
};

const typeMapping: TypeMapping = {
  file: selectTarget.bind(null, selectTargetTypes.openFile),
  dir: selectTarget.bind(null, selectTargetTypes.openDirectory),
};

ipcMain.handle('btn_click', async (_, type: Operations) => {
  if (!typeMapping[type]) throw new Error('There is no action with $type} name');
  return await typeMapping[type]();
});

const pack: IArchverMethod = (input, output, name) => Archiver.pack(input, output, { name });
const unpack: IArchverMethod = (input, output, name) => Archiver.unpack(input, output, { name });

const appModeMapping: AppModeMapping = {
  [Modes.packDir]: pack,
  [Modes.packFile]: pack,
  [Modes.unpack]: unpack,
};

ipcMain.on('run', async (_, { input, output, name, mode }: IOptions) => {
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
