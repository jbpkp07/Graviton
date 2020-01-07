import { default as express, Request, Response } from "express";

import { api } from "../api/api";
import { config } from "../config/config";


export class Controller {

    public router: express.Router = express.Router();

    public constructor() {

        this.router.route("/")
            .get(this.sendClientApp.bind(this));

        this.router.route("/api/lookups")
            .get(api.getLookups.bind(this));
    }

    private sendClientApp(_request: Request, response: Response): void {

        response.sendFile(config.htmlAssetPath);
    }
}
