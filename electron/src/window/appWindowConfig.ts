import { BrowserWindowConstructorOptions } from "electron";
import electronIsDev from "electron-is-dev";
import path from "path";


function getFullPath(relativePath: string): string {

    return path.join(__dirname, relativePath);
}

export interface IAppWindowConfig {

    appWindowOptions: BrowserWindowConstructorOptions;
    rendererHTMLServerErrorDev: string;
    rendererHTMLServerErrorProd: string;
    rendererURLDev: string;
    rendererURLProd: string;
    fadeFPS: number;
    blurOpacity: number;
    focusOpacity: number;
    closeDurationMS: number;
    fadeToDurationMS: number;
    showDurationMS: number;
}

export const mainWindowConfig: IAppWindowConfig = {

    appWindowOptions: {

        height: 1080,
        width: 1920,

        minHeight: 900,
        minWidth: 1440,

        center: true,

        alwaysOnTop: !electronIsDev,
        backgroundColor: "#181818",
        darkTheme: true,
        frame: false,
        opacity: 0,
        paintWhenInitiallyHidden: true,
        show: false,

        webPreferences: {

            backgroundThrottling: false,
            contextIsolation: false,
            devTools: true,
            nodeIntegration: false,
            preload: getFullPath("../preload/preloader.js"),
            zoomFactor: 1
        }
    },
    rendererHTMLServerErrorDev: getFullPath("../../../renderer/public/static/serverError.html"),
    rendererHTMLServerErrorProd: getFullPath("../public/serverError.html"),
    rendererURLDev:  "http://localhost:3000",
    rendererURLProd: "https://hub-graviton.herokuapp.com",

    fadeFPS: 60,

    blurOpacity: 0.7,
    focusOpacity: 1,

    closeDurationMS: 750,
    fadeToDurationMS: 250,
    showDurationMS: 750
};
