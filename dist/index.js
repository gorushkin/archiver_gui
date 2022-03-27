"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
let window;
const isDev = process.env['NODE_MODE'] === 'dev';
const createWindow = () => {
    window = new electron_1.BrowserWindow({
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
electron_1.app.on('ready', createWindow);
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit(); // exit
    }
});
