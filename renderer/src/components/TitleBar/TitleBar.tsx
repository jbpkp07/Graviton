import React from "react";

import "./TitleBar.css";

export const TitleBar: React.FC = (): JSX.Element => {

    return (

        <div id="titleBar" className="drag">
            <img id="spafaxLogo" className="drag" src={require("../../images/spafaxLogo.png")} alt="Spafax Logo" draggable="false" />
            <div id="title">
                <span id="titleText" className="drag">spafax</span>
            </div>
            <div id="windowBtnsBox">
                <div id="minimizeBtn" className="titleBarBtn nodrag">-</div>
                <div id="maximizeBtn" className="titleBarBtn nodrag">+</div>
                <div id="closeBtn" className="titleBarBtn nodrag">x</div>
            </div>
        </div>
    );
};
