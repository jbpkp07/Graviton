import { AxiosResponse } from "axios";

import { ILookup as ILookupModel, ILookups as ILookupsModel } from "../server/src/db/models/lookups";


export declare namespace API {

    interface IApi {
        
        getLookups: (...args: any) => void | Promise<ILookups>;
    }

    type ILookup = ILookupModel;
    type ILookups = ILookupsModel;
}
