import Electron, { remote, webFrame } from "electron";


export declare namespace ElectronAPI {

    interface IElectronAPI {

        remote: Electron.Remote;
        webFrame: Electron.WebFrame;
    }

    interface IWindow extends Window {

        electronAPI: IElectronAPI;
    }
}

export const electronAPI: ElectronAPI.IElectronAPI = {

    remote,
    webFrame
};
