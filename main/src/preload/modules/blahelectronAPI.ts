import Electron, { remote, webFrame } from "electron";

import { ElectronAPI } from "../../../../shared/ElectronAPI";


export const electronAPI: ElectronAPI.IElectronAPI = {

    getCurrentWindow(): ElectronAPI.IAppWindow {

        return remote.getCurrentWindow() as ElectronAPI.IAppWindow;
    },
    resetZoomFactor(factor: number): number {

        webFrame.setZoomFactor(factor);

        return webFrame.getZoomFactor();
    },
    showOpenDialogSync(options: Electron.OpenDialogOptions): string[] | undefined {

        return remote.dialog.showOpenDialogSync(this.getCurrentWindow(), options);
    }
};
