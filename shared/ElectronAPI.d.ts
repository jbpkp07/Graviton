import Electron from "electron";


export declare namespace ElectronAPI {

    interface IAppWindow extends Electron.BrowserWindow {

        closeGracefully(): void;
    }
    
    interface IElectronAPI {
    
        getCurrentWindow(): IAppWindow;
        resetZoomFactor(factor: number): number;
        showOpenDialogSync(options: Electron.OpenDialogOptions): string[] | undefined;
    }

    interface INodeAPI {
        
        // To be filled in later as needed. Functions that give granular access to the NodeJS libraries.
        test(): boolean;
    }
    
    interface IWindow extends Window {
    
        electronAPI: IElectronAPI;
        nodeAPI: INodeAPI;
    }
}
