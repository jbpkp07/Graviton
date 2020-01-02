import React from "react";

import "./Admin.css";
import { Button, IButtonProps } from "../../components/Button/Button";
import { DropDown, IDropDownProps, IOptionType } from "../../components/DropDown/DropDown";


interface IDropDownStates {
    [key: string]: IOptionType | null;
    aspectRatioDropDown: IOptionType | null;
    versionDropDown: IOptionType | null;
}

interface IAdminScreenState {

    selectedOptions: IDropDownStates;
    submitButtonIsActive: boolean;
}

let adminScreenState: IAdminScreenState = {

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
            options: [
                { label: "4 x 3", value: "4x3" },
                { label: "16 x 9", value: "16x9" },
                { label: "16 x 10", value: "16x10" }
            ],
            placeholder: "Aspect Ratio",
            positionLeft: "150px",
            positionTop: "none",
            selectedOption: this.state.selectedOptions["aspectRatioDropDown"],
            width: "145px",
            onChange: this.handleDropDownChange
        };

        const versionDropDownProps: IDropDownProps = {

            id: "versionDropDown",
            options: [
                { label: "Theatrical", value: "T" },
                { label: "Edited", value: "E" },
                { label: "Special Edit", value: "SE" }
            ],
            placeholder: "Version",
            positionLeft: "150px",
            positionTop: "130px",
            selectedOption: this.state.selectedOptions["versionDropDown"],
            width: "145px",
            onChange: this.handleDropDownChange
        };

        return (

            <div id="adminScreen">
                <Button {...buttonProps} />
                <DropDown {...aspectRatioDropDownProps} />
                <DropDown {...versionDropDownProps} />
            </div>
        );
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
