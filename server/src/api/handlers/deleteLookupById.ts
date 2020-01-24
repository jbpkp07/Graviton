import { Request, Response } from "express";

import { Controller } from "../../controller/Controller";
import { convertToILookups, ILookups, ILookupsDoc } from "../../db/models/lookups";


const clientErr: string = "ERROR [api.deleteLookupById()]:  \"Server could not delete lookup entry from graviton database\"";

export function deleteLookupById(this: Controller, request: Request, response: Response): void {

    const lookupType: string = request.params.lookupType;

    const _id: string = request.params._id;

    const options: object[] = [

        { },
        { $pull: { [lookupType]: { _id } } },
        { new: true, useFindAndModify: false }
    ];

    // @ts-ignore  (Typescript doesn't like the spread operator "..." for function params)
    this.gravitonDatabase.lookupsModel.findOneAndUpdate(...options).exec()

        .then((lookupsDoc: ILookupsDoc | null) => {

            if (lookupsDoc !== null) {

                const lookups: ILookups = convertToILookups(lookupsDoc);

                setTimeout(() => {
                    response.json(lookups);
                }, 5000);

                // DONT LEAVE THIS TIMEOUT HERE FOREVER, JUST FOR TESTING ------------------------------------------------
            }
            else {

                this.sendError(response, 500, clientErr);
            }
        })
        .catch((err: string) => {

            this.sendError(response, 500, clientErr, err);
        });
}
