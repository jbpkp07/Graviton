import { CancelTokenSource } from "axios";
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

    private readonly apiCancelToken: CancelTokenSource = api.getNewCancelToken();

    public readonly render = (): JSX.Element => {

        const componentProps: IAdminComponentProps = getComponentProps.call(this);

        return (

            <div id="adminScreen">
                <Button   {...componentProps.submitButtonProps} />
                <DropDown {...componentProps.aspectRatioDropDownProps} />
                <DropDown {...componentProps.versionDropDownProps} />
                <DataTableAdaptor {...componentProps.dataTableAdaptorProps} />
                <DataTableAdaptor {...componentProps.dataTableAdaptorProps2} />
            </div>
        );
    }

    public readonly componentDidMount = (): void => {

        api.getLookups(this.apiCancelToken)

            .then((lookups: API.ILookups) => {

                this.setState({ lookups });
            });
    }

    public readonly componentWillUnmount = (): void => {

        this.apiCancelToken.cancel("Admin Screen");

        adminScreenState = this.state;
    }

    protected readonly submit = (_buttonId: string): void => {

        const selectedOptions: IDropDownStates = this.state.selectedOptions;

        Object.keys(selectedOptions).forEach((key: string) => {

            selectedOptions[key] = null;
        });

        const submitButtonIsActive: boolean = false;

        this.setState({ selectedOptions, submitButtonIsActive }, () => console.log(this.state.selectedOptions));
    }

    protected readonly handleDropDownChange = (dropDownId: string, selectedOption: API.ILookup | null): void => {

        const selectedOptions: IDropDownStates = this.state.selectedOptions;

        selectedOptions[dropDownId] = selectedOption;

        const submitButtonIsActive: boolean = !Object.values(selectedOptions).some((option: API.ILookup | null) => option === null);

        this.setState({ selectedOptions, submitButtonIsActive }, () => console.log(this.state.selectedOptions));
    }

    protected readonly handleDataTableDeleteBtnClick = (kind: keyof API.ILookupsKind, _id: string): void => {

        api.deleteLookupById(kind, _id, this.apiCancelToken)

            .then((lookups: API.ILookups) => {

                this.setState({ lookups });
            });
    }
}
