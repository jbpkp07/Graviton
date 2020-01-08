import mongoose, { Document, Model, Schema, SchemaDefinition, SchemaTypeOpts } from "mongoose";


interface ILookupSchema {

    _id?: any;
    label: string | SchemaTypeOpts<any>;
    ordinal: number | SchemaTypeOpts<any>;
    value: string | SchemaTypeOpts<any>;
}

export interface ILookup extends ILookupSchema {

    _id?: any;
    label: string;
    ordinal: number;
    value: string;
}

export interface ILookups {

    aspectRatios: ILookup[];
    versions: ILookup[];
}

export interface ILookupsDoc extends ILookups, Document { }

export function convertToILookups(lookupsDoc: ILookupsDoc): ILookups {

    const lookups: any = lookupsDoc.toObject({ versionKey: false });

    delete lookups._id;

    return lookups;
}

const lookupSchema: ILookupSchema = {

    _id: false,
    label: {
        minlength: 1,
        required: true,
        type: String,
        unique: true
    },
    ordinal: {
        max: 99,
        min: 0,
        required: true,
        type: Number
    },
    value: {
        minlength: 1,
        required: true,
        type: String,
        unique: true
    }
};

const lookupsSchema: SchemaDefinition = {

    aspectRatios: [lookupSchema],
    versions: [lookupSchema]
};

export const lookupsModel: Model<ILookupsDoc> = mongoose.model("lookups", new Schema(lookupsSchema));
