import mongoose, { Document, Model, Schema, SchemaDefinition, SchemaTypeOpts } from "mongoose";


interface ILookupSchema {

    _id?: any;
    label: SchemaTypeOpts<any> | string;
    ordinal: SchemaTypeOpts<any> | number;
    value: SchemaTypeOpts<any> | string;
}

const lookupSchema: ILookupSchema = {

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

interface ILookupsSchema {

    aspectRatios: ILookupSchema[] | ILookup[];
    versions: ILookupSchema[] | ILookup[];
}

const lookupsSchema: ILookupsSchema & SchemaDefinition = {

    aspectRatios: [lookupSchema],
    versions: [lookupSchema]
};

export const lookupsModel: Model<ILookupsDoc> = mongoose.model("lookups", new Schema(lookupsSchema));

export interface ILookup extends ILookupSchema {

    _id?: any;
    label: string;
    ordinal: number;
    value: string;
}

export interface ILookups extends ILookupsSchema {

    aspectRatios: ILookup[];
    versions: ILookup[];
}

export interface ILookupsDoc extends ILookups, Document { }

export function convertToILookups(lookupsDoc: ILookupsDoc): ILookups {

    const lookups: any = lookupsDoc.toObject({ versionKey: false });

    delete lookups._id;

    return lookups;
}
