import React from "react";

import "./Admin.css";
import { api } from "../../api/api";
import { API } from "../../../../shared/API";
import { Button } from "../../components/Button/Button";
import { getComponentProps, IAdminComponentProps } from "./componentProps";
import { DataTable, IDataTableProps } from "../../components/DataTable/DataTable";
import { DropDown } from "../../components/DropDown/DropDown";


interface IDropDownStates {
    
    [key: string]: API.ILookup | null;
    aspectRatioDropDown: API.ILookup | null;
    versionDropDown: API.ILookup | null;
}

interface IAdminScreenState {

    lookups: API.ILookups | null;
    selectedOptions: IDropDownStates;
    submitButtonIsActive: boolean;
}

let adminScreenState: IAdminScreenState = {

    lookups: null,
    selectedOptions: {

        aspectRatioDropDown: null,
        versionDropDown: null
    },
    submitButtonIsActive: false
};


const dataTableProps: IDataTableProps = {

    columns: [
        { title: "Name" },
        { title: "Position" },
        { title: "Office" },
        { title: "Extn." },
        { title: "Start date" },
        { orderable: false, width: "30px" }
    ],
    data: [
        ["Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", '<div data-id="0" class="dataTableDeleteBtn button">Delete</div>'],
        ["Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", '<div data-id="1" class="dataTableDeleteBtn button">Delete</div>'],
        ["Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", '<div data-id="2" class="dataTableDeleteBtn button">Delete</div>'],
        ["Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "6224", "2012/03/29", '<div data-id="3" class="dataTableDeleteBtn button">Delete</div>']
    ],
    maxWidth: "1000px",
    pageLength: 2,
    positionLeft: "0px",
    positionTop: "200px",
    wrapperId: "jeremyTable"
};



export class AdminScreen extends React.Component {

    public readonly state: IAdminScreenState = adminScreenState;

    public readonly render = (): JSX.Element => {

        const componentProps: IAdminComponentProps = getComponentProps.call(this);






        return (

            <div id="adminScreen">
                <Button   {...componentProps.submitButtonProps} />
                <DropDown {...componentProps.aspectRatioDropDownProps} />
                <DropDown {...componentProps.versionDropDownProps} />
                <DataTable {...dataTableProps} />
            </div>
        );
    }

    public readonly componentDidMount = (): void => {

        // Temporary test code below
        // ---------------------------------------------------------------------------
        // (api.deleteLookupById("5e190d0d15e47f5f505dd1a7") as Promise<API.ILookups>)

        //     .then((lookups: API.ILookups) => {

        //         this.setState({ lookups });
        //     });

        (api.getLookups() as Promise<API.ILookups>)

            .then((lookups: API.ILookups) => {

                this.setState({ lookups });
            });
    }

    public readonly componentWillUnmount = (): void => {

        adminScreenState = this.state;
    }

    public readonly submit = (_buttonId: string): void => {

        dataTableProps.data = [
            ["4Tiger Nixon", "Edinburgh", "5421", "2011/04/25", '<div data-id="0" class="dataTableDeleteBtn button">Delete</div>'],
            ["3Garrett Winters", "Tokyo", "8422", "2011/07/25", '<div data-id="1" class="dataTableDeleteBtn button">Delete</div>'],
            ["2Ashton Cox", "San Francisco", "1562", "2009/01/12", '<div data-id="2" class="dataTableDeleteBtn button">Delete</div>'],
            ["1Cedric Kelly", "Edinburgh", "6224", "2012/03/29", '<div data-id="3" class="dataTableDeleteBtn button">Delete</div>']
        ];

        dataTableProps.columns = [
            { title: "Name" },
            { title: "Office" },
            { title: "Extn." },
            { title: "Start date" },
            { 
                orderable: false,  
                width: "30px"
            }
        ];

        const selectedOptions: IDropDownStates = this.state.selectedOptions;

        Object.keys(selectedOptions).forEach((key: string) => {

            selectedOptions[key] = null;
        });

        const submitButtonIsActive: boolean = false;

        this.setState({ selectedOptions, submitButtonIsActive }, () => console.log(this.state.selectedOptions));
    }

    public readonly handleDropDownChange = (dropDownId: string, selectedOption: API.ILookup | null): void => {

        const selectedOptions: IDropDownStates = this.state.selectedOptions;

        selectedOptions[dropDownId] = selectedOption;

        const submitButtonIsActive: boolean = !Object.values(selectedOptions).some((option: API.ILookup | null) => option === null);

        this.setState({ selectedOptions, submitButtonIsActive }, () => console.log(this.state.selectedOptions));
    }
}
