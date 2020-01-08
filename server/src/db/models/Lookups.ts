import mongoose, { Document, Model, Schema, SchemaDefinition, SchemaTypeOpts } from "mongoose";


interface ILookupBase {

    label: string | SchemaTypeOpts<any>;
    ordinal: number | SchemaTypeOpts<any>;
    value: string | SchemaTypeOpts<any>;
}

interface ILookupOpts extends ILookupBase {

    _id: boolean;
    label: SchemaTypeOpts<any>;
    ordinal: SchemaTypeOpts<any>;
    value: SchemaTypeOpts<any>;
}

export interface ILookup extends ILookupBase {

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

    const lookups: any = lookupsDoc.toObject();

    delete lookups._id;

    delete lookups.__v;

    return lookups;
}

const lookupOpts: ILookupOpts = {

    _id: false,
    label: {
        minlength: 1,
        required: true,
        trim: true,
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
        trim: true,
        type: String,
        unique: true
    }
};

const lookupsSchemaDefinition: SchemaDefinition = {

    aspectRatios: [lookupOpts],
    versions: [lookupOpts]
};

export const LookupsModel: Model<ILookupsDoc> = mongoose.model("Lookups", new Schema(lookupsSchemaDefinition));
