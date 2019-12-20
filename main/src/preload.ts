import { remote } from "electron";
import electronIsDev from "electron-is-dev";

import { ContextMenu } from "./ContextMenu";

interface IElectronAPI {

    random: number;
    openFileDialog: Function;
}

interface IWindow extends Window {

    electronAPI: IElectronAPI;
}

declare const window: IWindow;

if (electronIsDev) {

    const contextMenu: ContextMenu = new ContextMenu();

    window.addEventListener("contextmenu", contextMenu.showMenu.bind(contextMenu));
}








window.electronAPI = {

    random: 43210,
    openFileDialog: (): void => {

        remote.dialog.showOpenDialog(remote.getCurrentWindow(), {});
    }
};

// window.addEventListener("DOMContentLoaded", (): void => {

// });






// let xPos: number = 0;
// let yPos: number = 0;

// const contextMenu: Electron.Menu = new remote.Menu();

// const inspectMenuItem: MenuItemConstructorOptions = {

//     click: (): void => { remote.getCurrentWindow().webContents.inspectElement(xPos, yPos); },
//     label: "Inspect"
// };

// contextMenu.append(new remote.MenuItem(inspectMenuItem));

// window.addEventListener("contextmenu", (event: MouseEvent) => {

//     event.preventDefault();

//     xPos = event.x;
//     yPos = event.y;

//     const window: Electron.BrowserWindow = remote.getCurrentWindow();

//     contextMenu.popup({ window });
// });
