import React from "react";

import "./Admin.css";
import { api } from "../../api/api";
import { API } from "../../../../shared/API";
import { Button } from "../../components/Button/Button";
import { getComponentProps, IAdminComponentProps } from "./componentProps";
import { DropDown, IOptionType } from "../../components/DropDown/DropDown";


interface IDropDownStates {
    
    [key: string]: IOptionType | null;
    aspectRatioDropDown: IOptionType | null;
    versionDropDown: IOptionType | null;
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
            </div>
        );
    }

    public readonly componentDidMount = (): void => {

        (api.getLookups() as Promise<API.ILookups>)

            .then((response: API.ILookups) => {

                const lookups: API.ILookups = response;

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

    public readonly handleDropDownChange = (dropDownId: string, selectedOption: IOptionType | null): void => {

        const selectedOptions: IDropDownStates = this.state.selectedOptions;

        selectedOptions[dropDownId] = selectedOption;

        const submitButtonIsActive: boolean = !Object.values(selectedOptions).some((option: IOptionType | null) => option === null);

        this.setState({ selectedOptions, submitButtonIsActive }, () => console.log(this.state.selectedOptions));
    }
}
