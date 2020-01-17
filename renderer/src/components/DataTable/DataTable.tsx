import jQuery from "jquery";
import React from "react";

import "./DataTable.css";
import "./datatables/datatables.css";


interface IJQuery extends JQueryStatic {

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
    id: string;
    maxWidth: string;
    pageLength: number;
    positionLeft: string;
    positionTop: string;
}

export class DataTable extends React.Component<IDataTableProps> {

    public readonly wrapperClassName: string = "dataTableWrapper";

    public readonly selectorBase: string = `div#${this.props.id}.${this.wrapperClassName}`;

    public readonly selectorBaseInner: string = `${this.selectorBase} > #dataTable_wrapper`;

    public readonly deleteBtnsSelector: string = `   ${this.selectorBaseInner} > #dataTable > tbody > tr > td > .dataTableDeleteBtn`;
    public readonly paginateBtnsSelector: string = ` ${this.selectorBaseInner} > .dataTables_paginate > span > .paginate_button:not(.paginate_button.current)`;
    public readonly searchTextBoxSelector: string = `${this.selectorBaseInner} > #dataTable_filter > label > input`;
    public readonly sortBtnsSelector: string = `     ${this.selectorBaseInner} > #dataTable > thead > tr > th`;

    public readonly initialTableId: string = "dataTable";
    public readonly initialTableElement: string = `<table id="${this.initialTableId}" />`;
    public readonly initialTableSelector: string = `${this.selectorBase} > #${this.initialTableId}`;



    public readonly state: IDataTableState = {

        table: null
    };

    public readonly render = (): JSX.Element => {
        console.log("rendering...");

        const cssProperties: React.CSSProperties = {

            left: this.props.positionLeft,
            maxWidth: this.props.maxWidth,
            top: this.props.positionTop
        };

        return (

            <div
                id={this.props.id}
                className={this.wrapperClassName}
                style={cssProperties}
            />
        );
    }

    public readonly componentDidMount = (): void => {

        this.createTable(this.props);
    }

    public readonly componentWillUnmount = (): void => {

        // this.removeAllListeners();

        this.destroyTable();
    }

    public readonly shouldComponentUpdate = (nextProps: IDataTableProps): boolean => {

        if (JSON.stringify(nextProps) !== JSON.stringify(this.props)) {   // Do deep comparison of props object

            // console.log("Different Props");

            if (JSON.stringify(nextProps.columns) !== JSON.stringify(this.props.columns)) {

                // console.log("Different Columns... Brand new table");

                this.createTable(nextProps);
            }
            else {

                // console.log("Same Columns... Redraw existing table");

                this.reDrawTable(nextProps);
            }

        }
        else {

            // console.log("Same props");
        }

        return false;  // Never return true, we don't want React controlling DOM manipulation because Datatables uses JQuery to do it
    }

    private readonly createTable = (props: IDataTableProps): void => {
        console.log("creating table");
        this.destroyTable()

            .then(() => {

                $(this.selectorBase).append(this.initialTableElement);

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

                const table: DataTables.Api = $(this.initialTableSelector).DataTable(tableSettings);

                $(this.searchTextBoxSelector) // Modify search text box for custom styling
                    .addClass("textBox")
                    .attr("id", "dataTableTextBox")
                    .attr("type", "text")
                    .attr("placeholder", "Search");

                $(this.searchTextBoxSelector) // Remove search text box default label "Search:"
                    .parent()
                    .contents()
                    .filter((_index: number, node: Node): boolean => node.nodeType === 3)
                    .remove();

                this.assignAllListeners();

                this.setState({ table });
            });
    }

    private readonly reDrawTable = (props: IDataTableProps): void => {

        if (this.state.table !== null) {

            this.state.table.clear().rows.add(props.data).draw(false);

            this.assignAllListeners();
        }
    }

    private readonly destroyTable = async (): Promise<void> => {

        return new Promise((resolve: Function): void => {

            if (this.state.table !== null) {

                // this.removeAllListeners();

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

        this.removeAllListeners();

        $(this.deleteBtnsSelector).one("click", this.handleDeleteBtnClick);

        $(this.paginateBtnsSelector).one("click", this.handlePaginateBtnClick);

        $(this.searchTextBoxSelector).one("change", this.handleSearchChange);

        $(this.sortBtnsSelector).one("click", this.handleSortBtnClick);
    }

    private readonly removeAllListeners = (): void => {

        $(this.deleteBtnsSelector).off("click", this.handleDeleteBtnClick);

        $(this.paginateBtnsSelector).off("click", this.handlePaginateBtnClick);

        $(this.searchTextBoxSelector).off("change", this.handleSearchChange);

        $(this.sortBtnsSelector).off("click", this.handleSortBtnClick);
    }

    private readonly handleDeleteBtnClick = (event: JQuery.ClickEvent): void => {

        const id: string = event.target.dataset.id;
        console.log(`Deleting id: ${id}`);
        if (this.state.table !== null) {

            const rowToRemove: JQuery = $(`${this.deleteBtnsSelector}[data-id="${id}"]`).parent("td").parent("tr");

            this.state.table.row(rowToRemove).remove();

            this.state.table.draw(false);

            this.assignAllListeners();
        }
    }

    private readonly handlePaginateBtnClick = (): void => {

        console.log("clicked paginate button");
        this.assignAllListeners();
    }

    private readonly handleSearchChange = (): void => {

        console.log("changed search");
        this.assignAllListeners();
    }

    private readonly handleSortBtnClick = (): void => {

        console.log("clicked sort button");
        this.assignAllListeners();
    }
}
