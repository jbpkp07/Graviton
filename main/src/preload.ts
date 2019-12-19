import { MenuItemConstructorOptions, remote } from "electron";

// window.addEventListener("DOMContentLoaded", (): void => {

//     const replaceText: Function = (selector: string, text: string): void => {

//         const element: HTMLElement | null = document.getElementById(selector);

//         if (element !== null) {

//             element.innerText = text;
//         }
//     };

//     for (const app of ["chrome", "node", "electron"]) {

//         // @ts-ignore
//         replaceText(`${app}-version`, process.versions[app]);
//     }
// });

let xPos: number = 0;
let yPos: number = 0;

const menuItemOptions: MenuItemConstructorOptions = {

    click: (): void => {

        remote.getCurrentWindow().webContents.inspectElement(xPos, yPos);
    },
    label: "Inspect Element"
};

const menuItem: Electron.MenuItem = new remote.MenuItem(menuItemOptions);

const menu: Electron.Menu = new remote.Menu();

menu.append(menuItem);

window.addEventListener("contextmenu", (event: MouseEvent) => {

    event.preventDefault();

    xPos = event.x;
    yPos = event.y;

    const popupOptions: Electron.PopupOptions = {

        window: remote.getCurrentWindow()
    };

    menu.popup(popupOptions);
});
