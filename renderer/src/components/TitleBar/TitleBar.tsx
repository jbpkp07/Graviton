import React from "react";

import "./TitleBar.css";

export const TitleBar: React.FC = (): JSX.Element => {

    return (

        <div id="titleBar" className="drag">
            {/* <img id="spafaxLogo" className="drag" src={require("../../images/spafaxLogo.png")} alt="Spafax Logo" draggable="false" /> */}
            <div id="spafaxLogo">
                <span className="titleBarText drag">spafax</span>
            </div>
            <div id="title">
                <span className="titleBarText drag">graviton</span>
            </div>
            <div id="windowBtnsBox">
                <div id="minimizeBtn" className="titleBarBtn">-</div>
                <div id="maximizeBtn" className="titleBarBtn">+</div>
                <div id="closeBtn" className="titleBarBtn">x</div>
            </div>
        </div>
    );
};
