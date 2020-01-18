import { AxiosResponse } from "axios";

import {
    ILookup as ILookupModel,
    ILookupLanguage as ILookupLanguageModel,
    ILookups as ILookupsModel
} from "../server/src/db/models/lookups";


export declare namespace API {

    interface IApi {

        deleteLookupById: (...args: any) => void | Promise<ILookups>;
        getLookups: (...args: any) => void | Promise<ILookups>;
    }

    type ILookup = ILookupModel;
    type ILookupLanguage = ILookupLanguageModel;
    type ILookups = ILookupsModel;
}
