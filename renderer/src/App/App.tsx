import React from "react";

import { AdminScreen } from "../screens/Admin/Admin";
import "./App.css";
import { EScreen } from "../screens/EScreen";
import { currentWindow } from "../index";
import { INavBarProps, NavBar } from "../components/NavBar/NavBar";
import { StartScreen } from "../screens/Start/Start";
import { TitleBar } from "../components/TitleBar/TitleBar";


interface IAppState {

    currentScreen: EScreen;
}

export class App extends React.Component {

    public readonly state: IAppState = {

        currentScreen: EScreen.Start
    };

    public readonly render = (): JSX.Element => {

        const navBarProps: INavBarProps = {
            
            currentScreen: this.state.currentScreen,
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

        switch (this.state.currentScreen) {

            case EScreen.Start:
                return (<StartScreen />);

            case EScreen.Admin:
                return (<AdminScreen />);

            case EScreen.Renamer:
                return (<div className="btn">Renamer Button</div>);

            default:
                return (<StartScreen />);
        }
    }

    private readonly selectScreen = (currentScreen: EScreen): void => {

        this.setState({ currentScreen });
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
