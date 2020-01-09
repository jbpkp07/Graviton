import Axios, { AxiosResponse } from "axios";

import { API } from "../../../../shared/API";
import { currentWindow } from "../../index";


const clientErr: string = "ERROR [api.getLookups()]:  \"Server could not retreive lookups object from graviton database\"";

export async function getLookups(): Promise<API.ILookups> {

    return new Promise((resolve: Function): void => {

        Axios.get("/api/lookups")

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
