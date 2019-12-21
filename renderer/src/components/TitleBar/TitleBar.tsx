import React from "react";

import { AppWindow } from "../../../../main/src/window/AppWindow";
import "./TitleBar.css";

interface ITitleBarProps {

    currentWindow: AppWindow;
}

export function TitleBar(props: ITitleBarProps): JSX.Element {

    const currentWindow: AppWindow = props.currentWindow;

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

        <div id="titleBar" className="drag">
            <div id="spafaxLogo" className="drag">
                <span className="titleBarText drag">spafax</span>
            </div>
            <div id="title" className="drag">
                <span className="titleBarText drag">graviton</span>
            </div>
            <div id="titleBarBtnsBox">
                <img src={require("./minimize.svg")} alt="min"   id="minimizeBtn" className="titleBarBtn" onClick={minimizeWindow} draggable="false" />
                <img src={require("./maximize.svg")} alt="max"   id="maximizeBtn" className="titleBarBtn" onClick={maximizeWindow} draggable="false" />
                <img src={require("./close.svg")}    alt="close" id="closeBtn"    className="titleBarBtn" onClick={closeWindow}    draggable="false" />
            </div>
        </div>
    );
}
