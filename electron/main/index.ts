// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.js    > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//

import { release } from "node:os";
import { join } from "node:path";
import { app, BrowserWindow, shell, ipcMain } from "electron";

process.env.DIST_ELECTRON = join(__dirname, "../..");
process.env.DIST = join(process.env.DIST_ELECTRON, "../dist");
process.env.PUBLIC = app.isPackaged
  ? process.env.DIST
  : join(process.env.DIST_ELECTRON, "../public");

const initialWindowTitle = process.env.WINDOW_TITLE ?? "electron-template";

// Disable GPU Acceleration for Windows 7
if(release().startsWith("6.1"))
  app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if(process.platform === "win32")
  app.setAppUserModelId(app.getName());

if(!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

let win: BrowserWindow | null = null;
// Here, you can also use other preload
const preload = join(__dirname, "../preload/index.js");
const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = join(process.env.DIST, "index.html");

async function createWindow() {
  win = new BrowserWindow({
    title: initialWindowTitle,
    icon: join(process.env.PUBLIC, "favicon.svg"),
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if(app.isPackaged)
    win.loadFile(indexHtml);
  else {
    win.loadURL(url);
    // win.webContents.openDevTools()
  }

  // intercept requests to add CORS headers
  win.webContents.session.webRequest.onBeforeSendHeaders(
    (details, callback) =>
      callback({ requestHeaders: { Origin: "*", ...details.requestHeaders } }),
  );

  win.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Access-Control-Allow-Origin": ["*"],
        "Access-Control-Allow-Headers": ["*"],
      },
    });
  });

  // Test actively push message to the Electron-Renderer
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if(url.startsWith("https:"))
      shell.openExternal(url);
    return { action: "deny" };
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  win = null;
  if(process.platform !== "darwin")
    app.quit();
});

app.on("second-instance", () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if(win.isMinimized())
      win.restore();
    win.focus();
  }
});

app.on("activate", () => {
  const allWindows = BrowserWindow.getAllWindows();
  if(allWindows.length)
    allWindows[0].focus();
  else
    createWindow();
});

// new window example arg: new windows url
ipcMain.handle("open-win", (event, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
    },
  });

  if(app.isPackaged)
    childWindow.loadFile(indexHtml, { hash: arg });
  else
    childWindow.loadURL(`${url}/#${arg}`);
});
