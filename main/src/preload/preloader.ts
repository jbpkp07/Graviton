import { ContextMenu } from "./modules/ContextMenu";
import { electronAPI } from "./modules/electronAPI";
import { ElectronAPI } from "../../../shared/ElectronAPI";
import { nodeAPI } from "./modules/nodeAPI";

const contextMenu: ContextMenu = new ContextMenu();

declare const window: ElectronAPI.IWindow;

window.addEventListener("contextmenu", contextMenu.showMenu.bind(contextMenu));

window.electronAPI = electronAPI;

window.nodeAPI = nodeAPI;
