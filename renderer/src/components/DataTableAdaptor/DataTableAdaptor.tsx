// tslint:disable: object-literal-sort-keys
import React from "react";

import { API } from "../../../../shared/API";
import { DataTable, IDataTableProps } from "../DataTable/DataTable";


interface IGenericObject {

    [key: string]: any;
}

export enum ETableLayout {

    ILookup = "ILookup",
    ILookupLanguage = "ILookupLanguage"
}

export interface IDataTableAdaptorProps {

    allowRowDelete: boolean;
    dataArray: IGenericObject[] | null;
    maxWidth: string;
    pageLength: number;
    positionLeft: string;
    positionTop: string;
    tableLayout: ETableLayout;
    wrapperId: string;
}

export class DataTableAdaptor extends React.Component<IDataTableAdaptorProps> {

    public readonly render = (): JSX.Element => {

        let columnKeys: string[];

        const columns: DataTables.ColumnSettings[] = [];
        const data: string[][] = [];
    
        const dataTableProps: IDataTableProps = {
    
            allowRowDelete: this.props.allowRowDelete,
            columnDefClassName: "dt-left",
            columns: [],
            data: [],
            maxWidth: this.props.maxWidth,
            pageLength: this.props.pageLength,
            positionLeft: this.props.positionLeft,
            positionTop: this.props.positionTop,
            wrapperId: this.props.wrapperId
        };
    
        if (this.props.dataArray === null) {
    
            dataTableProps.columnDefClassName = "dt-center";
            dataTableProps.columns = [{ title: "Loading..." }];
            dataTableProps.data = [[""]];
    
            return (
    
                <DataTable {...dataTableProps} />
            );
        }
    
        switch (this.props.tableLayout) {
    
            case ETableLayout.ILookup: {
    
                const orderedKeys: API.ILookup = {
                    label: "",
                    value: "",
                    ordinal: 0
                };
                columnKeys = Object.keys(orderedKeys);
                break;
            }
    
            case ETableLayout.ILookupLanguage: {
    
                const orderedKeys: API.ILookupLanguage = {
                    value: "",
                    label: "",
                    languageName: "",
                    languageRegional: "",
                    iso639: "",
                    ordinal: 0
                };
                columnKeys = Object.keys(orderedKeys);
                break;
            }
    
            default:
    
                columnKeys = [];
        }
    
        columnKeys.forEach((key: string) => {
    
            const prettyTitle: string = key.replace(/((?<!^)[A-Z](?![A-Z]))(?=\S)/g, " $1").replace(/^./, (str: string) => str.toUpperCase());
    
            columns.push({ title: prettyTitle });
        });
    
        this.props.dataArray.forEach((object: IGenericObject) => {
    
            const row: string[] = [];
    
            columnKeys.forEach((key: string) => {
    
                (object[key] !== undefined) ? row.push(object[key]) : row.push("...");
            });
    
            data.push(row);
        });
    
        if (columns.length > 0 && data.length > 0) {
    
            if (this.props.allowRowDelete && !this.props.dataArray.some((object: IGenericObject) => object["_id"] === undefined)) {
    
                columns.push({ orderable: false, width: "30px" });
    
                for (let i: number = 0; i < this.props.dataArray.length; i++) {
    
                    data[i].push(`<div class="dataTableDeleteBtn button" data-id="${this.props.dataArray[i]["_id"]}">Delete</div>`);
                }
            }
        }
    
        dataTableProps.columns = columns;
        dataTableProps.data = data;
    
        return (
    
            <DataTable {...dataTableProps} />
        );
    }
}
