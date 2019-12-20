import { app } from "electron";

import { AppWindow } from "./AppWindow";
import { mainWindowConfig } from "./config";


let mainWindow: AppWindow | null = null;

function createMainWindow(): void {

    if (mainWindow === null) {

        mainWindow = new AppWindow(mainWindowConfig);

        mainWindow.on("closed", (): void => {

            mainWindow = null;
        });
    }
}

app.on("ready", createMainWindow);

app.on("activate", createMainWindow);

app.on("window-all-closed", (): void => {

    if (process.platform !== "darwin") {

        app.quit();
    }
});
