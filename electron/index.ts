import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import path from 'path';

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
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit(); // exit
  }
});
