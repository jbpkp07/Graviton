import React from "react";

import { ElectronAPI } from "../../main/src/preload/modules/ElectronAPI";
import "./App.css";
import { TitleBar } from "./components/TitleBar/TitleBar";

declare const window: ElectronAPI.IWindow;

const webFrame: Electron.WebFrame = window.electronAPI.webFrame;

webFrame.setZoomFactor(1);
console.log(webFrame.getZoomFactor());

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

    console.log("here: Jeremy");

    return (

        <div className="App">
            <TitleBar />
            <header className="App-header">
                <img src={require("./logo.svg")} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer" >
                    Learn React
                </a>
            </header>
        </div>
    );
};
