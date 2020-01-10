import path from "path";

function getFullPath(relativePath: string): string {

    return path.join(__dirname, relativePath);
}

export interface IConfig {

    MONGODB_URI: string;
    port: string;
    htmlAssetPath: string;
    staticAssetsPath: string;
}

export const config: IConfig = {

    MONGODB_URI: (process.env.MONGODB_URI !== undefined) ? process.env.MONGODB_URI : "mongodb://localhost/graviton",
    port: (process.env.PORT !== undefined) ? process.env.PORT : "3001",

    htmlAssetPath: getFullPath("../../../renderer/build/index.html"),
    staticAssetsPath: getFullPath("../../../renderer/build")
};
