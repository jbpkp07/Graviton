import fs from "fs";

import { ElectronAPI } from "../../../../shared/ElectronAPI";


export const nodeAPI: ElectronAPI.INodeAPI = {

    test(): boolean {

        return fs.existsSync(__filename);
    }
};
