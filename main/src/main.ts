// Modules to control application life and create native browser window
// const {app, BrowserWindow} = require('electron')
// const path = require('path')

import { app, BrowserWindow, BrowserWindowConstructorOptions } from "electron";
import electronIsDev from "electron-is-dev";
import path from "path";

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: BrowserWindow | null = null;


function createWindow(): void {
    // Create the browser window.

    if (mainWindow !== null) {

        throw new Error("Electron main window already created.");
    }

    const options: BrowserWindowConstructorOptions = {

        width: 1680,
        height: 1050,

        webPreferences: {
            devTools: true,
            nodeIntegration: false,
            preload: path.join(__dirname, "./preload.js")
        }
    };

    mainWindow = new BrowserWindow(options);

    // and load the index.html of the app.
    // mainWindow.loadFile("./index.html");

    if (electronIsDev) {

        mainWindow.loadURL("http://localhost:3000")

            .then((): void => {
                // @ts-ignore
                mainWindow.webContents.openDevTools(); // Open the DevTools.
            })
            .catch((err: string) => {

                throw new Error(err);
            });
    }
    else {

        const prodPath: string = `file://${path.join(__dirname, "./index.html")}`;

        mainWindow.loadURL(prodPath);
    }

    // Emitted when the window is closed.
    mainWindow.on("closed", (): void => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// On macOS it's common to re-create a window in the app when the
// dock icon is clicked and there are no other windows open.
app.on("activate", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", (): void => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {

        app.quit();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
