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

        return this.renderTable(dataTableProps);
    }

    private readonly renderTable = (dataTableProps: IDataTableProps): JSX.Element => {
    
        if (this.props.dataArray === null) {

            return this.renderLoadingTable(dataTableProps);
        }

        const columnKeys: string[] = this.getColumnKeys();

        const columns: DataTables.ColumnSettings[] = this.getColumns(columnKeys);

        const dataRows: string[][] = this.getDataRows(columnKeys, this.props.dataArray);
    
        const doAllRowsHaveIds: boolean = !this.props.dataArray.some((object: IGenericObject) => object["_id"] === undefined);

        if (columns.length > 0 && dataRows.length > 0 && doAllRowsHaveIds) {
    
            this.addDeleteButtons(columns, dataRows, this.props.dataArray);
        }
        
        dataTableProps.columns = columns;
        dataTableProps.data = dataRows;
    
        return (
    
            <DataTable {...dataTableProps} />
        );
    }

    private readonly renderLoadingTable = (dataTableProps: IDataTableProps): JSX.Element => {
    
        dataTableProps.columnDefClassName = "dt-center";
        dataTableProps.columns = [{ title: "Loading..." }];
        dataTableProps.data = [[""]];

        return (

            <DataTable {...dataTableProps} />
        );
    }

    private readonly getColumnKeys = (): string[] => {
    
        switch (this.props.tableLayout) {
    
            case ETableLayout.ILookup: {
    
                const orderedKeys: API.ILookup = {

                    value: "",
                    label: "",
                    ordinal: 0
                };
                
                return Object.keys(orderedKeys);
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

                return Object.keys(orderedKeys);
            }
    
            default: {

                return [];
            }
        }
    }

    private readonly getColumns = (columnKeys: string[]): DataTables.ColumnSettings[] => {

        const columns: DataTables.ColumnSettings[] = [];

        columnKeys.forEach((key: string) => {
    
            const prettyTitle: string = key.replace(/((?<!^)[A-Z](?![A-Z]))(?=\S)/g, " $1").replace(/^./, (str: string) => str.toUpperCase());
    
            columns.push({ title: prettyTitle });
        });

        return columns;
    }

    private readonly getDataRows = (columnKeys: string[], dataArray: IGenericObject[]): string[][] => {

        const dataRows: string[][] = [];
    
        dataArray.forEach((object: IGenericObject) => {
    
            const row: string[] = [];
    
            columnKeys.forEach((key: string) => {

                if (object[key] !== undefined && object[key] !== "") {

                    row.push(object[key]);
                }
                else {

                    row.push("...");
                }
            });
    
            dataRows.push(row);
        });

        return dataRows;
    }

    private readonly addDeleteButtons = (columns: DataTables.ColumnSettings[], dataRows: string[][], dataArray: IGenericObject[]): void => {

        if (this.props.allowRowDelete) {
    
            columns.push({ orderable: false, width: "30px" });

            for (let i: number = 0; i < dataArray.length; i++) {

                dataRows[i].push(DataTable.getDeleteBtnElement(dataArray[i]["_id"]));
            }
        }
    }
}
