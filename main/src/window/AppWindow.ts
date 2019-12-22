import { BrowserWindow } from "electron";
import electronIsDev from "electron-is-dev";

import { IAppWindowConfig } from "./appWindowConfig";
import { ElectronAPI } from "../../../shared/ElectronAPI";


export class AppWindow extends BrowserWindow implements ElectronAPI.IAppWindow {

    private readonly config: IAppWindowConfig;

    private intervalID: NodeJS.Timeout | null = null;

    public constructor(config: IAppWindowConfig) {

        super(config.appWindowOptions);

        this.config = config;

        this.loadRenderer();

        this.assignListeners();
    }

    public closeGracefully(): void {

        if (this.intervalID !== null) { clearInterval(this.intervalID); }

        this.fadeTo(0, this.config.closeDurationMS).then(() => {

            this.close();
        });
    }

    private loadRenderer(): void {

        if (electronIsDev) {

            this.loadURL(this.config.rendererURLDev).then((): void => {

                // this.webContents.openDevTools(); 
            });
        }
        else {

            this.loadFile(this.config.rendererHTMLPathProd);
        }
    }

    private assignListeners(): void {

        this.once("ready-to-show", () => {

            this.showInactive();

            setTimeout(() => {
                
                this.fadeTo(this.config.blurOpacity, this.config.showDurationMS).then(() => {

                    this.setAlwaysOnTop(false);
    
                    this.on("focus", () => {
    
                        if (this.intervalID !== null) { clearInterval(this.intervalID); }
    
                        this.fadeTo(this.config.focusOpacity, this.config.fadeToDurationMS);
                    });
    
                    this.on("blur", () => {
    
                        if (this.intervalID !== null) { clearInterval(this.intervalID); }
    
                        this.fadeTo(this.config.blurOpacity, this.config.fadeToDurationMS);
                    });
                });

            }, 250);
        });
    }

    private async fadeTo(toOpacity: number, fadeMS: number): Promise<void> {

        let opacity: number = this.getOpacity();

        const isIncreasing: boolean = (opacity < toOpacity) ? true : false;

        const renderMS: number = Math.floor(1000 / this.config.fadeFPS);

        const ms: number = (fadeMS >= renderMS) ? fadeMS : renderMS;

        const step: number = parseFloat(((toOpacity - opacity) / (ms / renderMS)).toFixed(3));

        return new Promise((resolve: Function): void => {

            this.intervalID = setInterval(() => {

                opacity = parseFloat((opacity + step).toFixed(3));

                if ((isIncreasing && opacity >= toOpacity) || (!isIncreasing && opacity <= toOpacity)) {

                    opacity = toOpacity;

                    this.setOpacity(opacity);

                    if (this.intervalID !== null) { clearInterval(this.intervalID); }

                    resolve();
                }
                else {

                    this.setOpacity(opacity);
                }

            }, renderMS);
        });
    }
}
