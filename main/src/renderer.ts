// import { Menu, MenuItem, MenuItemConstructorOptions, remote } from "electron";

// interface ICoords {

//     x: number;
//     y: number;
// }

// let rightClickPosition: ICoords = {

//     x: 0,
//     y: 0
// };

// const menuItemOptions: MenuItemConstructorOptions = {

//     click: (): void => {

//         remote.getCurrentWindow().webContents.inspectElement(rightClickPosition.x, rightClickPosition.y);
//     },
//     label: "Inspect Element"
// };

// const menuItem: MenuItem = new MenuItem(menuItemOptions);

// const menu: Menu = new Menu();

// menu.append(menuItem);

// window.addEventListener("contextmenu", (event: MouseEvent) => {

//     event.preventDefault();

//     rightClickPosition = { x: event.x, y: event.y };

//     const popupOptions: Electron.PopupOptions = {

//         window: remote.getCurrentWindow()
//     };

//     menu.popup(popupOptions);

// }, false);
