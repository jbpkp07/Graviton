import Electron, { BrowserWindow, MenuItemConstructorOptions, remote } from "electron";


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

        const window: BrowserWindow = remote.getCurrentWindow();

        this.contextMenu.popup({ window });
    }
}
