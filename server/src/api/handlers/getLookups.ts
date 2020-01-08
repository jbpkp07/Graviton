import { Request, Response } from "express";

import { Controller } from "../../controller/Controller";
import { convertToILookups, ILookups, ILookupsDoc } from "../../db/models/Lookups";


export function getLookups(this: Controller, _request: Request, response: Response): void {

    this.gravitonDatabase.lookupsModel.findOne().exec()

        .then((lookupsDoc: ILookupsDoc | null) => {

            if (lookupsDoc !== null) {

                const lookups: ILookups = convertToILookups(lookupsDoc);

                response.json(lookups);
            }
            else {

                this.sendError(response, 500, "ERROR: Lookups object not found in database");
            }
        })
        .catch((err: string) => {

            this.sendError(response, 500, "ERROR: Lookups object not found in database", err);
        });
}
