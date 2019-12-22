import electronIsDev from "electron-is-dev";

import { ContextMenu } from "./modules/ContextMenu";
import { electronAPI } from "./modules/electronAPI";
import { ElectronAPI } from "../../../shared/ElectronAPI";


declare const window: ElectronAPI.IWindow;

if (electronIsDev) {

    const contextMenu: ContextMenu = new ContextMenu();

    window.addEventListener("contextmenu", contextMenu.showMenu.bind(contextMenu));
}

window.electronAPI = electronAPI;
