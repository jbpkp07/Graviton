import React from "react";

import "./Admin.css";
import { api } from "../../api/api";
import { API } from "../../../../shared/API";
import { Button } from "../../components/Button/Button";
import { getComponentProps, IAdminComponentProps } from "./componentProps";
import { DataTableAdaptor } from "../../components/DataTableAdaptor/DataTableAdaptor";
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

export class AdminScreen extends React.Component {

    public readonly state: IAdminScreenState = adminScreenState;

    public readonly render = (): JSX.Element => {

        const componentProps: IAdminComponentProps = getComponentProps.call(this);

        return (

            <div id="adminScreen">
                <Button   {...componentProps.submitButtonProps} />
                <DropDown {...componentProps.aspectRatioDropDownProps} />
                <DropDown {...componentProps.versionDropDownProps} />
                <DataTableAdaptor {...componentProps.dataTableAdaptorProps} />
                {/* <DataTableAdaptor {...componentProps.dataTableAdaptorProps2} /> */}
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
