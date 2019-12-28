import React from "react";
import ReactDOM from "react-dom";

import { App } from "./App/App";
import { ElectronAPI } from "../../shared/ElectronAPI";


declare const window: ElectronAPI.IWindow;

export const currentWindow: ElectronAPI.IAppWindow = window.electronAPI.getCurrentWindow();

window.electronAPI.resetZoomFactor(1);

ReactDOM.render(<App />, document.getElementById("root"));
