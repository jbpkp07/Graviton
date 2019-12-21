import React from "react";

import "./App.css";
import { AppWindow } from "../../main/src/window/AppWindow";
import { ElectronAPI } from "../../main/src/preload/modules/ElectronAPI";
import { TitleBar } from "./components/TitleBar/TitleBar";

declare const window: ElectronAPI.IWindow;

const remote: Electron.Remote = window.electronAPI.remote;
const currentWindow: AppWindow = remote.getCurrentWindow() as AppWindow;
const webFrame: Electron.WebFrame = window.electronAPI.webFrame;

webFrame.setZoomFactor(1);

console.log(`zoomFactor: ${webFrame.getZoomFactor()}`);

// setTimeout(() => {

//     const options: Electron.OpenDialogOptions = {

//         title: "select hub file asset",
//         buttonLabel: "Select File",
//         // filters: [
//         //   { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
//         //   { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
//         //   { name: 'Custom File Type', extensions: ['as'] },
//         //   { name: 'All Files', extensions: ['*'] }
//         // ],
//         properties: ["openFile"]
//     };

//     // remote.dialog.showOpenDialog(remote.getCurrentWindow(), options)

//     //     .then((filePath: Electron.OpenDialogReturnValue) => {

//     //         console.log(filePath.canceled);
//     //         console.log(filePath.filePaths);
//     //     });

//     console.log(remote.dialog.showOpenDialogSync(options));

// }, 5000);



export const App: React.FC = (): JSX.Element => {

    return (

        <div className="App">
            <TitleBar {...{ currentWindow }} />
            <div className="App-header">
                <img src={require("./logo.svg")} className="App-logo" alt="logo" draggable="false" />
            </div>
        </div>
    );
};
