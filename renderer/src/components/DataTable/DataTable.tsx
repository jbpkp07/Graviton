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

    allowRowDelete: boolean;
    columnDefClassName: string;
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

    private oldProps: any | null = null;

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
        console.log("first attempt");
        this.createTable(this.props);
    }

    public readonly componentWillUnmount = (): void => {

        this.destroyTable();
    }

    public readonly shouldComponentUpdate = (nextProps: IDataTableProps): boolean => {
        console.log("second attempt");

        if (this.oldProps !== null) {
            console.log(JSON.stringify(nextProps.columns));
            console.log(JSON.stringify(this.oldProps.columns));

        }

        const isSame: boolean = nextProps.columns.some((setting: DataTables.ColumnSettings) => {
           
            setting.title !== 
        });



        if (JSON.stringify(nextProps.columns) !== JSON.stringify(this.props.columns)) {




            this.oldProps = { columns: nextProps.columns };
            
            
            console.log(JSON.stringify(this.oldProps.columns));
   


            this.createTable(nextProps);
        }
        else if (JSON.stringify(nextProps.data) !== JSON.stringify(this.props.data)) {

            this.reDrawTable(nextProps);
        }



        return false;
    }

    private readonly createTable = (props: IDataTableProps): void => {
        console.log("creating table");
        this.destroyTable();

        let columnDefClassName: string = props.columnDefClassName;
        let columns: DataTables.ColumnSettings[] = props.columns;
        let data: string[][] = props.data;

        if (columns.length === 0) {

            columnDefClassName = "dt-center";
            columns = [{ title: "ERROR: No columns provided..." }];
            data = [[""]];
        }
        else if (data.length !== 0 && data.some((row: string[]) => row.length !== columns.length)) {

            columnDefClassName = "dt-center";
            columns = [{ title: "ERROR: Column and data count mismatch..." }];
            data = [[""]];
        }

        const tableSettings: DataTables.Settings = {

            autoWidth: false,
            columnDefs: [{
                className: columnDefClassName,
                targets: "_all"
            }],
            columns,
            data,
            info: false,
            lengthChange: false,
            pageLength: props.pageLength,
            pagingType: "numbers"
        };

        $(this.baseSelector).append(this.initialTableElement);

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

        if (this.dataTable === null) {

            return;
        }

        if (props.columns.length === 0 || props.data.length === 0) {

            this.createTable(props);
        }
        else if (props.data.some((row: string[]) => row.length !== props.columns.length)) {

            this.createTable(props);
        }
        else {

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

        if (!this.props.allowRowDelete) {

            return;
        }

        this.removeAllListeners();

        $(this.searchTextBoxSelector).one("change", this.handleSearchChange);

        $(this.sortBtnsSelector).one("click", this.handleSortBtnClick);

        $(this.deleteBtnsSelector).one("click", this.handleDeleteBtnClick);

        $(this.paginateBtnsSelector).one("click", this.handlePaginateBtnClick);
    }

    private readonly removeAllListeners = (): void => {

        if (!this.props.allowRowDelete) {

            return;
        }

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
