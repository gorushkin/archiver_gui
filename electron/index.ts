import path from 'path';

import { app, BrowserWindow, ipcMain, dialog } from 'electron';

let window: Electron.BrowserWindow;

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
