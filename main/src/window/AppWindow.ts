import { BrowserWindow } from "electron";
import electronIsDev from "electron-is-dev";

import { IAppWindowConfig } from "./appWindowConfig";


export class AppWindow extends BrowserWindow {

    private intervalID: NodeJS.Timeout | null = null;

    public constructor(config: IAppWindowConfig) {

        super(config.appWindowOptions);

        this.loadRenderer(config);

        this.assignListeners(config);
    }

    public closeGracefully(): void {

        if (this.intervalID !== null) { clearInterval(this.intervalID); }

        this.fadeTo(0, 500).then(() => {

            this.close();
        });
    }

    private loadRenderer(config: IAppWindowConfig): void {

        if (electronIsDev) {

            this.loadURL(config.rendererURLDev).then((): void => {

                // this.webContents.openDevTools(); 
            });
        }
        else {

            this.loadFile(config.rendererHTMLPathProd);
        }
    }

    private assignListeners(config: IAppWindowConfig): void {

        this.once("ready-to-show", () => {

            this.showInactive();

            setTimeout(() => {
                
                this.fadeTo(config.blurOpacity, config.showDurationMS).then(() => {

                    this.setAlwaysOnTop(false);
    
                    this.on("focus", () => {
    
                        if (this.intervalID !== null) { clearInterval(this.intervalID); }
    
                        this.fadeTo(config.focusOpacity, config.fadeToDurationMS);
                    });
    
                    this.on("blur", () => {
    
                        if (this.intervalID !== null) { clearInterval(this.intervalID); }
    
                        this.fadeTo(config.blurOpacity, config.fadeToDurationMS);
                    });
                });

            }, 250);
        });
    }

    private async fadeTo(toOpacity: number, fadeMS: number): Promise<void> {

        let opacity: number = this.getOpacity();

        const isIncreasing: boolean = (opacity < toOpacity) ? true : false;

        const ms: number = (fadeMS >= 10) ? fadeMS : 10;

        const step: number = parseFloat(((toOpacity - opacity) / (ms / 10)).toFixed(3));

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

            }, 10);
        });
    }
}
