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
    window.showInactive();
    window.maximize();
};
// app.on('ready', createWindow);
electron_1.app.on('ready', createWindow);
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit(); // exit
    }
});
var selectTargetTypes;
(function (selectTargetTypes) {
    selectTargetTypes["openFile"] = "openFile";
    selectTargetTypes["openDirectory"] = "openDirectory";
})(selectTargetTypes || (selectTargetTypes = {}));
const selectTarget = async (action) => {
    const target = await electron_1.dialog.showOpenDialog(window, {
        defaultPath: electron_1.app.getPath('downloads'),
        properties: [action],
    });
    const [targetPath] = target.filePaths;
    return targetPath;
};
const typeMapping = {
    file: selectTarget.bind(null, selectTargetTypes.openFile),
    dir: selectTarget.bind(null, selectTargetTypes.openDirectory),
};
electron_1.ipcMain.handle('btn_click', async (_, type) => {
    if (!typeMapping[type])
        throw new Error('There is no action with $type} name');
    return await typeMapping[type]();
});
