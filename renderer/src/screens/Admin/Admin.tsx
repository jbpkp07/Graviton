import React from "react";

import "./Admin.css";
import { api } from "../../api/api";
import { API } from "../../../../shared/API";
import { Button, IButtonProps } from "../../components/Button/Button";
import { DropDown, IDropDownProps, IOptionType } from "../../components/DropDown/DropDown";

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

        const buttonProps: IButtonProps = {

            id: "submitButton",
            isActive: this.state.submitButtonIsActive,
            label: "Submit",
            positionLeft: "150px",
            positionTop: "180px",
            onClick: this.submit
        };

        const aspectRatioDropDownProps: IDropDownProps = {

            id: "aspectRatioDropDown",
            options: null,
            placeholder: "Aspect Ratio",
            positionLeft: "150px",
            positionTop: "none",
            selectedOption: this.state.selectedOptions.aspectRatioDropDown,
            width: "145px",
            onChange: this.handleDropDownChange
        };

        aspectRatioDropDownProps.options = (this.state.lookups !== null) ? this.state.lookups.aspectRatios : null;

        const versionDropDownProps: IDropDownProps = {

            id: "versionDropDown",
            options: null,
            placeholder: "Version",
            positionLeft: "150px",
            positionTop: "130px",
            selectedOption: this.state.selectedOptions.versionDropDown,
            width: "145px",
            onChange: this.handleDropDownChange
        };

        versionDropDownProps.options = (this.state.lookups !== null) ? this.state.lookups.versions : null;

        return (

            <div id="adminScreen">
                <Button {...buttonProps} />
                <DropDown {...aspectRatioDropDownProps} />
                <DropDown {...versionDropDownProps} />
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

    private readonly submit = (_buttonId: string): void => {

        const selectedOptions: IDropDownStates = this.state.selectedOptions;

        Object.keys(selectedOptions).forEach((key: string) => {

            selectedOptions[key] = null;
        });

        const submitButtonIsActive: boolean = false;

        this.setState({ selectedOptions, submitButtonIsActive }, () => console.log(this.state.selectedOptions));
    }

    private readonly handleDropDownChange = (dropDownId: string, selectedOption: IOptionType | null): void => {

        const selectedOptions: IDropDownStates = this.state.selectedOptions;

        selectedOptions[dropDownId] = selectedOption;

        const submitButtonIsActive: boolean = !Object.values(selectedOptions).some((option: IOptionType | null) => option === null);

        this.setState({ selectedOptions, submitButtonIsActive }, () => console.log(this.state.selectedOptions));
    }
}
