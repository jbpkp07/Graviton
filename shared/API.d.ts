import { AxiosResponse } from "axios";

import { ILookup as ILookupModel, ILookups as ILookupsModel } from "../server/src/db/models/Lookups";


export declare namespace API {

    interface IApi {
        
        getLookups: (...args: any) => void | Promise<ILookups>;
    }

    type ILookup = ILookupModel;
    type ILookups = ILookupsModel;
}
