import { ElectronAPI } from "./ElectronAPI";

export type Dog = { 
    test1?: string, 
    test2: string,
    bark(str: string): string;
};

export interface Cat extends ElectronAPI {
    test1?: string, 
    test2: string,
    bark(str: string): string;
}
