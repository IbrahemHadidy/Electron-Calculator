import { app, BrowserWindow, dialog, ipcMain } from "electron";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let mainWindow;

async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog({});
  if (!canceled) {
    return filePaths[0];
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 292,
    height: 345,
    maximizable: false,
    titleBarStyle: "hidden",
    resizable: false,
    frame: false,
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, "../preload/preload.js"),
      webSecurity: false,
      devTools: false,
      nodeIntegration: true,
    },
  });
  mainWindow.loadFile(path.join(__dirname, '..', 'renderer', 'index.html'));
  // mainWindow.loadURL("http://localhost:5173");
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  ipcMain.handle("dialog:openFile", handleFileOpen);

  ipcMain.on("window-close", () => {
    mainWindow.close();
  });

  ipcMain.on("window-minimize", () => {
    mainWindow.minimize();
  });

  createWindow();
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// Disable error dialogs by overriding
dialog.showErrorBox = (title, content) => {
  console.log(`${title}\n${content}`);
};