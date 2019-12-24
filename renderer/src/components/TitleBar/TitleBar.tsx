import React from "react";

import { ElectronAPI } from "../../../../shared/ElectronAPI";
import "./TitleBar.css";


interface ITitleBarProps {

    currentWindow: ElectronAPI.IAppWindow;
}

export function TitleBar(props: ITitleBarProps): JSX.Element {

    const currentWindow: ElectronAPI.IAppWindow = props.currentWindow;

    function minimizeWindow(): void {

        currentWindow.minimize();
    }

    function maximizeWindow(): void {

        currentWindow.isMaximized() ? currentWindow.unmaximize() : currentWindow.maximize(); 
    }

    function closeWindow(): void {

        currentWindow.closeGracefully();
    }

    return (

        <div id="titleBar" className="titleBarDrag">
            <div id="titleBarLogo" className="titleBarDrag">
                <span className="titleBarText titleBarDrag">spafax</span>
            </div>
            <div id="titleBarTitle" className="titleBarDrag">
                <span className="titleBarText titleBarDrag">graviton</span>
            </div>
            <div id="titleBarBtnsBox">
                <img src={require("./images/minimize.svg")} alt="Min"   title="Minimize"           className="titleBarBtn" onClick={minimizeWindow} draggable="false" />
                <img src={require("./images/maximize.svg")} alt="Max"   title="Maximize / Restore" className="titleBarBtn" onClick={maximizeWindow} draggable="false" />
                <img src={require("./images/close.svg")}    alt="Close" title="Close"              className="titleBarBtn" onClick={closeWindow}    draggable="false" />
            </div>
        </div>
    );
}
