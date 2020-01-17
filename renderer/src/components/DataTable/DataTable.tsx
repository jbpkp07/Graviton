import jQuery from "jquery";
import React from "react";

import "./DataTable.css";
import "./datatables/datatables.css";


interface IJQuery extends JQueryStatic {

    DataTable?(opts?: DataTables.Settings): DataTables.Api;
}

const $: IJQuery = jQuery;

$.DataTable = require("datatables.net");

export interface IDataTableProps {

    columns: DataTables.ColumnSettings[];
    data: string[][];
    maxWidth: string;
    pageLength: number;
    positionLeft: string;
    positionTop: string;
    wrapperId: string;
}

export class DataTable extends React.Component<IDataTableProps> {

    private readonly wrapperClassName: string = "dataTableWrapper";
    private readonly tableId: string = "dataTable";
    private readonly deleteBtnClassName: string = "dataTableDeleteBtn";

    private readonly baseSelector: string = `#${this.props.wrapperId}.${this.wrapperClassName}`;
    private readonly baseSelectorInner: string = `${this.baseSelector} > #${this.tableId}_wrapper`;

    private readonly initialTableElement: string = `<table id="${this.tableId}" />`;
    private readonly initialTableSelector: string = `${this.baseSelector} > #${this.tableId}`;

    private readonly searchTextBoxSelector: string = `${this.baseSelectorInner} > #${this.tableId}_filter > label > input`;
    private readonly sortBtnsSelector: string = `     ${this.baseSelectorInner} > #${this.tableId} > thead > tr > th`;
    private readonly deleteBtnsSelector: string = `   ${this.baseSelectorInner} > #${this.tableId} > tbody > tr > td > .${this.deleteBtnClassName}`;
    private readonly paginateBtnsSelector: string = ` ${this.baseSelectorInner} > #${this.tableId}_paginate > span > .paginate_button:not(.paginate_button.current)`;

    private dataTable: DataTables.Api | null = null;

    public readonly render = (): JSX.Element => {
        console.log("rendering...");

        const cssProperties: React.CSSProperties = {

            left: this.props.positionLeft,
            maxWidth: this.props.maxWidth,
            top: this.props.positionTop
        };

        return (

            <div
                id={this.props.wrapperId}
                className={this.wrapperClassName}
                style={cssProperties}
            />
        );
    }

    public readonly componentDidMount = (): void => {

        this.createTable(this.props);
    }

    public readonly componentWillUnmount = (): void => {

        this.destroyTable();
    }

    public readonly shouldComponentUpdate = (nextProps: IDataTableProps): boolean => {

        if (JSON.stringify(nextProps.columns) !== JSON.stringify(this.props.columns)) {  // Do deep comparison of props.columns object

            this.createTable(nextProps);
        }
        else if (JSON.stringify(nextProps.data) !== JSON.stringify(this.props.data)) {   // Do deep comparison of props.data object

            this.reDrawTable(nextProps);
        }

        return false;  // Never return true, we don't want React controlling DOM manipulation because Datatables uses JQuery to do it
    }

    private readonly createTable = (props: IDataTableProps): void => {
        console.log("creating table");
        this.destroyTable();

        $(this.baseSelector).append(this.initialTableElement);

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

        this.dataTable = $(this.initialTableSelector).DataTable(tableSettings);

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
    }

    private readonly reDrawTable = (props: IDataTableProps): void => {

        if (this.dataTable !== null) {

            this.dataTable.clear().rows.add(props.data).draw(false);

            this.assignAllListeners();
        }
    }

    private readonly destroyTable = (): void => {

        if (this.dataTable !== null) {

            this.removeAllListeners();

            this.dataTable.destroy(true);

            this.dataTable = null;
        }
    }

    private readonly assignAllListeners = (): void => {

        this.removeAllListeners();

        $(this.searchTextBoxSelector).one("change", this.handleSearchChange);

        $(this.sortBtnsSelector).one("click", this.handleSortBtnClick);

        $(this.deleteBtnsSelector).one("click", this.handleDeleteBtnClick);

        $(this.paginateBtnsSelector).one("click", this.handlePaginateBtnClick);
    }

    private readonly removeAllListeners = (): void => {

        $(this.searchTextBoxSelector).off("change", this.handleSearchChange);

        $(this.sortBtnsSelector).off("click", this.handleSortBtnClick);

        $(this.deleteBtnsSelector).off("click", this.handleDeleteBtnClick);

        $(this.paginateBtnsSelector).off("click", this.handlePaginateBtnClick);
    }

    private readonly handleDeleteBtnClick = (event: JQuery.ClickEvent): void => {

        const id: string = event.target.dataset.id;
        console.log(`Deleting id: ${id}`);
        if (this.dataTable !== null) {

            const rowToRemove: JQuery = $(`${this.deleteBtnsSelector}[data-id="${id}"]`).parent("td").parent("tr");

            this.dataTable.row(rowToRemove).remove();

            this.dataTable.draw(false);

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
