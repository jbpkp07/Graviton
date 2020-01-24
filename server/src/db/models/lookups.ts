import mongoose, { Document, Model, Schema, SchemaDefinition, SchemaTypeOpts } from "mongoose";


interface ILookupSchema {

    _id?: any;
    label: SchemaTypeOpts<any> | string;
    ordinal: SchemaTypeOpts<any> | number;
    value: SchemaTypeOpts<any> | string;
}

interface ILookupLanguageSchema extends ILookupSchema {

    iso639: SchemaTypeOpts<any> | string;
    languageName: SchemaTypeOpts<any> | string;
    languageRegional: SchemaTypeOpts<any> | string;
}

const lookupSchema: ILookupSchema = {

    label: {
        minlength: 1,
        required: true,
        type: String
    },
    ordinal: {
        default: 1,
        max: 99,
        min: 1,
        required: true,
        type: Number
    },
    value: {
        minlength: 1,
        required: true,
        type: String,
        unique: true  // value is the unique property
    }
};

const lookupSchemaLanguage: ILookupLanguageSchema = {

    ...lookupSchema,

    iso639: {
        minlength: 1,
        required: true,
        type: String
    },
    languageName: {
        minlength: 1,
        required: true,
        type: String
    },
    languageRegional: {
        minlength: 1,
        required: true,
        type: String
    }
};

interface ILookupsSchema {

    aspectRatios: ILookupSchema[] | ILookup[] | string;
    languages: ILookupLanguageSchema[] | ILookupLanguage[] | string;
    versions: ILookupSchema[] | ILookup[] | string;
}

const lookupsSchema: ILookupsSchema & SchemaDefinition = {

    aspectRatios: [lookupSchema],
    languages: [lookupSchemaLanguage],
    versions: [lookupSchema]
};

export const lookupsModel: Model<ILookupsDoc> = mongoose.model("lookups", new Schema(lookupsSchema));

export interface ILookup extends ILookupSchema {

    _id?: any;
    label: string;
    ordinal: number;
    value: string;
}

export interface ILookupLanguage extends ILookupLanguageSchema {

    _id?: any;
    iso639: string;
    label: string;
    languageName: string;
    languageRegional: string;
    ordinal: number;
    value: string;
}

export interface ILookups extends ILookupsSchema {

    aspectRatios: ILookup[];
    languages: ILookupLanguage[];
    versions: ILookup[];
}

export interface ILookupsType extends ILookupsSchema {

    aspectRatios: "aspectRatios";
    languages: "languages";
    versions: "versions";
}

export interface ILookupsDoc extends ILookups, Document { }

export function convertToILookups(lookupsDoc: ILookupsDoc): ILookups {

    const lookups: any = lookupsDoc.toObject({ versionKey: false });

    delete lookups._id;

    return (lookups as ILookups);
}
