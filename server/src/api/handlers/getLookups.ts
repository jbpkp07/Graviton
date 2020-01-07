import { Request, Response } from "express";

import { API } from "../../../../shared/API";
import { Controller } from "../../controller/Controller";

export function getLookups(this: Controller, _request: Request, response: Response): void {

    const lookups: API.ILookups = {

        aspectRatios: [
            { label: "4 x 3", value: "4x3", ordinal: 1 },
            { label: "16 x 9", value: "16x9", ordinal: 3 },
            { label: "16 x 10", value: "16x10", ordinal: 2 }
        ],
        versions: [
            { label: "Theatrical", value: "T", ordinal: 2 },
            { label: "Edited", value: "E", ordinal: 1 }
        ]
    };

    response.json(lookups);
}
