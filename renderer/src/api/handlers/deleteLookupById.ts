import Axios, { AxiosResponse } from "axios";

import { API } from "../../../../shared/API";
import { currentWindow } from "../../index";


const clientErr: string = "ERROR [api.deleteLookupById()]:  \"Server could not delete lookup entry from graviton database\"";

export async function deleteLookupById(_id: string): Promise<API.ILookups> {

    return new Promise((resolve: Function): void => {

        Axios.delete(`/api/lookups/${_id}`)

            .then((response: AxiosResponse<API.ILookups>) => {
                console.log(response.data);
                resolve(response.data);
            })
            .catch((response: string) => {

                console.log(response);

                alert(clientErr);

                currentWindow.loadServerError();
            });
    });
}
