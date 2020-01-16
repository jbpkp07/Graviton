import jQuery from "jquery";
import React from "react";

import "./DataTable.css";
import "./datatables/datatables.css";


interface IJQuery extends JQueryStatic {

    // dataTable?: DataTables.StaticFunctions;
    DataTable?(opts?: DataTables.Settings): DataTables.Api;
}

const $: IJQuery = jQuery;

$.DataTable = require("datatables.net");

interface IDataTableState {

    table: DataTables.Api | null;
}

export interface IDataTableProps {

    columns: DataTables.ColumnSettings[];
    data: string[][];
    maxWidth?: string;
    pageLength?: number;
    positionLeft?: string;
    positionTop?: string;
}

export class DataTable extends React.Component<IDataTableProps> {

    public readonly state: IDataTableState = {

        table: null
    };

    public readonly render = (): JSX.Element => {
        console.log("rendering...");

        return (

            <div id="dataTableWrapper" style={{ left: this.props.positionLeft, top: this.props.positionTop, maxWidth: this.props.maxWidth }} />
        );
    }

    public readonly componentDidMount = (): void => {

        this.createTable(this.props);
    }

    public readonly componentWillUnmount = (): void => {

        this.removeAllListeners();

        this.destroyTable();
    }

    public readonly shouldComponentUpdate = (nextProps: IDataTableProps): boolean => {

        if (JSON.stringify(nextProps) !== JSON.stringify(this.props)) {   // Do deep comparison of props object

            console.log("Different Props");

            if (JSON.stringify(nextProps.columns) !== JSON.stringify(this.props.columns)) {

                console.log("Different Columns... Brand new table");

                this.createTable(nextProps);
            }
            else {

                console.log("Same Columns... Redraw existing table");

                this.reDrawTable(nextProps);
            }

        }
        else {

            console.log("Same props");
        }

        return false;  // Never return true, we don't want React controlling DOM manipulation because Datatables uses JQuery to do it
    }

    private readonly createTable = (props: IDataTableProps): void => {

        this.destroyTable()

            .then(() => {

                $("div#dataTableWrapper").append("<table id=\"dataTable\" />");

                const tableSettings: DataTables.Settings = {

                    autoWidth: false,
                    columnDefs: [{
                        className: "dt-left",
                        targets: "_all"
                    }],
                    columns: props.columns,
                    data: props.data,
                    info: false,
                    lengthChange: false,
                    pageLength: props.pageLength,
                    pagingType: "numbers"
                };

                const table: DataTables.Api = $("table#dataTable").DataTable(tableSettings);

                $("div#dataTable_filter > label > input")
                    .attr("id", "dataTableTextBox")
                    .addClass("textBox")
                    .attr("type", "text")
                    .attr("placeholder", "Search");

                $("div#dataTable_filter > label")
                    .contents()
                    .filter((_index: number, node: Node): boolean => node.nodeType === 3)
                    .remove();

                this.assignAllListeners();

                this.setState({ table });
            });
    }

    private readonly reDrawTable = (props: IDataTableProps): void => {

        if (this.state.table !== null) {

            this.removeAllListeners();

            this.state.table.clear().rows.add(props.data).draw(false);

            this.assignAllListeners();
        }
    }

    private readonly destroyTable = async (): Promise<void> => {

        return new Promise((resolve: Function): void => {

            if (this.state.table !== null) {

                this.removeAllListeners();

                this.state.table.destroy(true);

                this.setState({ table: null }, () => {

                    resolve();
                });
            }
            else {

                resolve();
            }
        });
    }

    private readonly assignAllListeners = (): void => {

        this.assignDeleteButtonListeners();

        this.assignPaginateButtonListeners();
    }

    private readonly removeAllListeners = (): void => {

        this.removeDeleteButtonListeners();

        this.removePaginateButtonListeners();
    }

    private readonly assignDeleteButtonListeners = (): void => {

        $("div.dataTableDeleteBtn[data-id]").one("click", (event: JQuery.ClickEvent): void => {

            const id: string = event.target.dataset.id;
            console.log(id);
            if (this.state.table !== null) {

                this.state.table.row($(`div.dataTableDeleteBtn[data-id="${id}"]`).parents("tr")).remove();

                this.state.table.draw(false);

                this.reAssignDeleteButtonListeners();

                this.assignPaginateButtonListeners();
            }
        });
    }

    private readonly removeDeleteButtonListeners = (): void => {

        $("div.dataTableDeleteBtn[data-id]").off("click");
    }

    private readonly reAssignDeleteButtonListeners = (): void => {

        this.removeDeleteButtonListeners();

        this.assignDeleteButtonListeners();
    }

    private readonly assignPaginateButtonListeners = (): void => {

        $("div.dataTables_paginate > span > a.paginate_button:not(a.paginate_button.current)").on("click", () => {

            console.log("clicked paginate button");
            this.reAssignDeleteButtonListeners();
            
            this.assignPaginateButtonListeners();
        });
    }

    private readonly removePaginateButtonListeners = (): void => {

        $("div.dataTables_paginate > span > a.paginate_button").off("click");
    }
}
