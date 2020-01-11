import { API } from "../../../shared/API";
import { deleteLookupById } from "./handlers/deleteLookupById";
import { getLookups } from "./handlers/getLookups";


export const api: API.IApi = {

    deleteLookupById,
    getLookups
};
