import { AxiosResponse } from "axios";

export declare namespace API {

    type getLookups = (...args: any) => void | Promise<ILookups>;

    interface IApi {
        getLookups: getLookups
    }

    interface ILookup {
        label: string;
        value: string;
        ordinal: number;
    }

    interface ILookups {
        aspectRatios: ILookup[];
        versions: ILookup[];
    }
}
