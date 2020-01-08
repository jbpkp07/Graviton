import { Request, Response } from "express";

import { Controller } from "../../controller/Controller";
import { convertToILookups, ILookups, ILookupsDoc } from "../../db/models/Lookups";


export function getLookups(this: Controller, _request: Request, response: Response): void {

    this.gravitonDatabase.lookupsModel.findOne().exec()

        .then((lookupsDoc: ILookupsDoc | null) => {

            if (lookupsDoc !== null) {

                console.log(lookupsDoc);
                console.log("\n\n");
                const lookups: ILookups = convertToILookups(lookupsDoc);

                console.log(lookups);

                response.json(lookups);
            }
        })
        .catch((err: string) => {

            console.log(err);
        });
}
