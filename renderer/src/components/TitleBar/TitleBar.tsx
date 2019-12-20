import React from "react";

import "./TitleBar.css";

export const TitleBar: React.FC = (): JSX.Element => {

    return (

        <div id="titleBar">
            <img id="spafaxLogo" src={require("../../images/spafaxLogo.png")} alt="Spafax Logo" draggable="false" />
            <div id="title">
                <span id="titleText">Graviton</span>
            </div>
            <div id="windowBtnsBox">
                <div id="minimizeBtn" className="titleBarBtn">-</div>
                <div id="maximizeBtn" className="titleBarBtn">+</div>
                <div id="closeBtn" className="titleBarBtn">x</div>
            </div>
        </div>
    );
};
