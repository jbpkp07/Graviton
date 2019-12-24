import React from "react";

import "./App.css";
import { ElectronAPI } from "../../../shared/ElectronAPI";
import { INavBarProps, NavBar } from "../components/NavBar/NavBar";
import { StartScreen } from "../screens/Start/Start";
import { TitleBar } from "../components/TitleBar/TitleBar";

declare const window: ElectronAPI.IWindow;
const currentWindow: ElectronAPI.IAppWindow = window.electronAPI.getCurrentWindow();

console.log(`zoomFactor: ${window.electronAPI.resetZoomFactor(1)}`);
console.log(`nodeAPI test: ${window.nodeAPI.test()}`);

interface IState {

    screen: EScreen;
}

export enum EScreen {

    Start = "Start",
    Admin = "Admin Console",
    Renamer = "File Renamer"
}

export class App extends React.Component {

    public readonly state: IState = {

        screen: EScreen.Start
    };

    public readonly render = (): JSX.Element => {

        const navBarProps: INavBarProps = {

            currentScreen: this.state.screen,
            selectScreen: this.selectScreen
        };

        return (

            <div id="app">
                <TitleBar {...{ currentWindow }} />
                <NavBar {...navBarProps} />
                <div id="appScreenWrapper">
                    {this.renderScreen()}
                </div>
            </div>
        );
    }

    private readonly renderScreen = (): JSX.Element => {

        switch (this.state.screen) {

            case EScreen.Start:
                return (<StartScreen />);

            case EScreen.Admin:
                return (<div />);

            default:
                return (<StartScreen />);
        }
    }

    private readonly selectScreen = (screen: EScreen): void => {
        console.log(screen);
        this.setState({ screen });
    }
}





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
