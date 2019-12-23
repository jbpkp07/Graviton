import React from "react";

import "./App.css";
import { ElectronAPI } from "../../../shared/ElectronAPI";
import { TitleBar } from "../components/TitleBar/TitleBar";

declare const window: ElectronAPI.IWindow;

const currentWindow: ElectronAPI.IAppWindow = window.electronAPI.getCurrentWindow();

console.log(`zoomFactor: ${window.electronAPI.resetZoomFactor(1)}`);

console.log(`nodeAPI test: ${window.nodeAPI.test()}`);


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

//     console.log(window.electronAPI.showOpenDialogSync(options));

// }, 5000);


export function App(): JSX.Element {

    return (

        <div className="App">
            <TitleBar {...{ currentWindow }} />
            <div className="App-header">
                <img src={require("./images/logo.svg")} className="App-logo" alt="logo" draggable="false" />
            </div>
        </div>
    );
}
