import path from "path";

function getFullPath(relativePath: string): string {

    return path.join(__dirname, relativePath);
}

export interface IConfig {

    port: string;
    MONGODB_URI: string;
    htmlAssetPath: string;
    staticAssetsPath: string;
}

export const config: IConfig = {

    port: (process.env.PORT !== undefined) ? process.env.PORT : "3001",
    MONGODB_URI: (process.env.MONGODB_URI !== undefined) ? process.env.MONGODB_URI : "mongodb://localhost/graviton",
    htmlAssetPath: getFullPath("../../../renderer/build/index.html"),
    staticAssetsPath: getFullPath("../../../renderer/build")
};