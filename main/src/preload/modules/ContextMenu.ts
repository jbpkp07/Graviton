import Electron, { MenuItemConstructorOptions, remote } from "electron";

import { ElectronAPI } from "../../../../shared/ElectronAPI";


export class ContextMenu {

    private xPos: number = 0;
    private yPos: number = 0;

    private readonly contextMenu: Electron.Menu = new remote.Menu();

    private readonly inspectMenuItem: MenuItemConstructorOptions = {

        click: (): void => { remote.getCurrentWindow().webContents.inspectElement(this.xPos, this.yPos); },
        label: "Inspect"
    };

    public constructor() {

        this.contextMenu.append(new remote.MenuItem(this.inspectMenuItem));
    }

    public showMenu(event: MouseEvent): void  {

        event.preventDefault();

        this.xPos = event.x;
        this.yPos = event.y;

        const window: ElectronAPI.IAppWindow = remote.getCurrentWindow() as ElectronAPI.IAppWindow;

        this.contextMenu.popup({ window });
    }
}
