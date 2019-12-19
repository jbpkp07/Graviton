import React from "react";

import "./App.css";
import { TitleBar } from "./components/TitleBar/TitleBar";

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
