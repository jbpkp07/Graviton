import { AxiosResponse } from "axios";

import { ILookup, ILookups } from "../server/src/db/models/Lookups";


export declare namespace API {

    type TLookup = ILookup;
    type TLookups = ILookups;
    type TGetLookups = (...args: any) => void | Promise<TLookups>;

    interface IApi {
        
        getLookups: TGetLookups
    }
}
