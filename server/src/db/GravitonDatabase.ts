import mongoose, { ConnectionOptions, Model } from "mongoose";

import { config } from "../config/config";
import { ILookups, ILookupsDoc, lookupsModel } from "./models/lookups";


export class GravitonDatabase {

    public readonly lookupsModel: Model<ILookupsDoc> = lookupsModel;

    public async connectDatabase(): Promise<string> {

        return new Promise((resolve: Function, reject: Function): void => {

            const options: ConnectionOptions = {

                useCreateIndex: true,    // prevents deprecation warning
                useNewUrlParser: true,
                useUnifiedTopology: true // prevents deprecation warning
            };

            mongoose.connect(config.MONGODB_URI, options)

                .then(() => {

                    this.addLookups();

                    resolve("Graviton database connected");
                })
                .catch((err: string) => {

                    reject(err);
                });
        });
    }










    public addLookups(): void {

        const lookups: ILookups = {

            aspectRatios: [
                { label: "4 x 3",   ordinal: 1, value: "4x3" },
                { label: "16 x 9",  ordinal: 3, value: "16x9" },
                { label: "16 x 10", ordinal: 2, value: "16x10" }
            ],
            versions: [
                { label: "Theatrical",  ordinal: 2, value: "T" },
                { label: "Edited3",     ordinal: 1, value: "E" }
            ]
        };

        this.lookupsModel.create(lookups)

            .catch((err: string) => {
                
                console.log(err);
            });
    }
}
