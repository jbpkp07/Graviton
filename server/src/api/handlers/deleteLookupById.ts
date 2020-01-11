import { Request, Response } from "express";

import { Controller } from "../../controller/Controller";
import { convertToILookups, ILookups, ILookupsDoc } from "../../db/models/lookups";


const clientErr: string = "ERROR [api.deleteLookupById()]:  \"Server could not delete lookup entry from graviton database\"";

export function deleteLookupById(this: Controller, request: Request, response: Response): void {

    const _id: string = request.params._id;

    this.gravitonDatabase.lookupsModel.findByIdAndDelete(_id).exec()

        .then((lookupsDoc: ILookupsDoc | null) => {

            if (lookupsDoc !== null) {

                const lookups: ILookups = convertToILookups(lookupsDoc);

                response.json(lookups);
            }
            else {

                this.sendError(response, 500, clientErr);
            }
        })
        .catch((err: string) => {

            this.sendError(response, 500, clientErr, err);
        });
}
