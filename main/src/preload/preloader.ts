import electronIsDev from "electron-is-dev";

import { ContextMenu } from "./modules/ContextMenu";
import { ElectronAPI, electronAPI } from "./modules/ElectronAPI";


declare const window: ElectronAPI.IWindow;

if (electronIsDev) {

    const contextMenu: ContextMenu = new ContextMenu();

    window.addEventListener("contextmenu", contextMenu.showMenu.bind(contextMenu));
}

window.electronAPI = electronAPI;
