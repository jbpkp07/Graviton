import { BrowserWindowConstructorOptions } from "electron";
import electronIsDev from "electron-is-dev";
import path from "path";


function getFullPath(relativePath: string): string {

    return path.join(__dirname, relativePath);
}

export interface IAppWindowConfig {

    appWindowOptions: BrowserWindowConstructorOptions;
    rendererHTMLPathProd: string;
    rendererURLDev: string;
    blurOpacity: number;
    focusOpacity: number;
    fadeToDurationMS: number;
    showDurationMS: number;
}

export const mainWindowConfig: IAppWindowConfig = {

    appWindowOptions: {

        width: 1920,
        height: 1200,

        center: true,

        minWidth: 1440,
        minHeight: 900,

        alwaysOnTop: !electronIsDev || true,
        show: false,
        paintWhenInitiallyHidden: true,
        frame: false,
        backgroundColor: "#181818",
        opacity: 0,
        darkTheme: true,

        webPreferences: {

            backgroundThrottling: false,
            contextIsolation: false,
            devTools: true,
            nodeIntegration: false,
            preload: getFullPath("../preload/preloader.js"),
            zoomFactor: 1
        }
    },
    rendererHTMLPathProd: getFullPath("../index.html"),
    rendererURLDev: "http://localhost:3000",
    blurOpacity: 0.7,
    focusOpacity: 1,
    fadeToDurationMS: 200,
    showDurationMS: 750
};
