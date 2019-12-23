import { BrowserWindowConstructorOptions } from "electron";
import electronIsDev from "electron-is-dev";
import path from "path";


function getFullPath(relativePath: string): string {

    return path.join(__dirname, relativePath);
}

export interface IAppWindowConfig {

    appWindowOptions: BrowserWindowConstructorOptions;
    rendererHTMLProd: string;
    rendererHTMLServerNotFoundDev: string;
    rendererHTMLServerNotFoundProd: string;
    rendererURLDev: string;
    fadeFPS: number;
    blurOpacity: number;
    focusOpacity: number;
    closeDurationMS: number;
    fadeToDurationMS: number;
    showDurationMS: number;
}

export const mainWindowConfig: IAppWindowConfig = {

    appWindowOptions: {

        width: 1920,
        height: 1080,

        center: true,

        minWidth: 1440,
        minHeight: 900,

        alwaysOnTop: !electronIsDev,
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
    rendererHTMLProd: getFullPath("../index.html"),
    rendererHTMLServerNotFoundDev: getFullPath("../../../renderer/public/serverNotFound.html"),
    rendererHTMLServerNotFoundProd: getFullPath("../serverNotFound.html"),
    rendererURLDev: "http://localhost:3000",
    fadeFPS: 60,
    blurOpacity: 0.7,
    focusOpacity: 1,
    closeDurationMS: 500,
    fadeToDurationMS: 200,
    showDurationMS: 500
};
