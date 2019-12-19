import { BrowserWindowConstructorOptions } from "electron";
import path from "path";

// interface IFilePaths {

//     preload: string;
// }

// const filePaths: IFilePaths = {

//     preload: path.join(__dirname, "./preload.js")
// };




export const browserWindowOptions: BrowserWindowConstructorOptions = {

    width: 1680,
    height: 1050,
    center: true,
    minWidth: 800,
    minHeight: 600,
    show: true,
    frame: false,
    opacity: 1,

    webPreferences: {
        devTools: true,
        nodeIntegration: false,
        preload: path.join(__dirname, "./preload.js"),
        zoomFactor: 1
    }
};
