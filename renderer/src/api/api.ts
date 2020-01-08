import Axios, { AxiosResponse } from "axios";

import { API } from "../../../shared/API";
import { currentWindow } from "../index";


export const api: API.IApi = {

    async getLookups(): Promise<API.ILookups> {

        return new Promise((resolve: Function): void => {

            Axios.get("/api/lookups")

                .then((response: AxiosResponse<API.ILookups>) => {
                    console.log(response.data);
                    resolve(response.data);
                })
                .catch((response: string) => {

                    alert(response);

                    currentWindow.loadServerNotFound();
                });
        });
    }
};
