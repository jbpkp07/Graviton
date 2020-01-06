import { AxiosResponse } from "axios";

export declare namespace API {

    interface IApi {
        getLookups(...args: any): void | Promise<AxiosResponse<ILookups>>;
    }

    interface ILookup {
        name: string;
        code: string;
    }

    interface ILookups {
        aspectRatios: ILookup[];
        versions: ILookup[];
    }
}
