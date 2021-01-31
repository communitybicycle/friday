import { app, BrowserWindow, dialog } from "electron";
import debug from "electron-debug";
import isDev from "electron-is-dev";
import installExtension, { REDUX_DEVTOOLS } from "electron-devtools-installer";
declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

debug();

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    show: false,
    width: 1280,
    height: 800,
    titleBarStyle: "hidden",
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  mainWindow.setMenu(null);

  installExtension(REDUX_DEVTOOLS).then((name: string) => {
    console.log(`Added Extension: ${name}`);
  });

  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.webContents.once("dom-ready", () => {
    mainWindow.show();
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

exports.getFileFromUser = () => {
  const files = dialog.showOpenDialog({
    properties: ["openFile"],
  });

  console.log("Files:", files);

  return files;
};

const getFolderFromUser = () => {
  dialog.showOpenDialog({
    properties: ["openDirectory"],
  });
};

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
