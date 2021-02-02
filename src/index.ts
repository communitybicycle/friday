import { app, BrowserWindow, dialog, ipcMain, protocol } from "electron";
import debug from "electron-debug";
import isDev from "electron-is-dev";
import installExtension, { REDUX_DEVTOOLS } from "electron-devtools-installer";
import * as fs from "fs";
import path from "path";
declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

debug();

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

let myWindow: BrowserWindow | null = null;

const createWindow = (): BrowserWindow => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    show: false,
    width: 1280,
    height: 800,
    minWidth: 1080,
    minHeight: 720,
    titleBarStyle: "hidden",
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      // webSecurity: false,
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

  return mainWindow;
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  myWindow = createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

/** Check if single instance, if not, simply quit new instance */
const isSingleInstance = app.requestSingleInstanceLock();
if (!isSingleInstance) {
  app.quit();
}

// Behaviour on second instance for parent process- Pretty much optional
app.on("second-instance", (event, argv, cwd) => {
  if (myWindow) {
    if (myWindow.isMinimized()) myWindow.restore();
    myWindow.focus();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on("ready", async () => {
  // Name the protocol whatever you want
  const protocolName = "safe-file-protocol";

  protocol.registerFileProtocol(protocolName, (request, callback) => {
    const url = request.url.replace(`${protocolName}://`, "");
    try {
      return callback(decodeURIComponent(url));
    } catch (error) {
      // Handle the error as needed
      console.error(error);
    }
  });
});

exports.getFileFromUser = () => {
  const files = dialog.showOpenDialog({
    properties: ["openFile"],
  });

  console.log("Files:", files);

  return files;
};

ipcMain.handle("store-image-file", async (event, arg) => {
  const result = await dialog.showOpenDialog({
    properties: ["openFile"],
    filters: [
      { name: "Image (.png, .jpg, .gif)", extensions: ["png", "jpg", "gif"] },
    ],
  });

  // checks if window was closed
  if (result.canceled) {
    const message = "No file selected!";
    console.log(message);
    return message;
  } else {
    // get first element in array which is path to file selected
    const filePath = result.filePaths[0];

    // get file name
    const fileName = path.basename(filePath);

    // path to app data + fileName = "C:\Users\John\AppData\Roaming\app_name\picture.png"
    const imgFolderPath = path.join(app.getPath("userData"), fileName);

    // copy file from original location to app data folder
    fs.copyFile(filePath, imgFolderPath, (err) => {
      if (err) throw err;
      console.log(fileName + " uploaded.");

      return imgFolderPath;
    });

    return imgFolderPath;
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
