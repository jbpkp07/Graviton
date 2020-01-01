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

    myNumber: number;
    selectedOptions: IDropDownStates;
}

let adminScreenState: IAdminScreenState = {

    myNumber: 0,
    selectedOptions: { 

        aspectRatioDropDown: null,
        versionDropDown: null
    }
};


export class AdminScreen extends React.Component {

    public readonly state: IAdminScreenState = adminScreenState;

    public readonly render = (): JSX.Element => {

        const buttonProps: IButtonProps = {

            id: "incrementButton",
            label: "Select Button",
            positionLeft: "150px",
            positionTop: "180px",
            onClick: this.increment
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
                <div id="myNumber">{this.state.myNumber}</div>
            </div>
        );
    }

    public readonly componentWillUnmount = (): void => {

        adminScreenState = this.state;
    }

    private readonly increment = (buttonId: string): void => {

        const myNumber: number = this.state.myNumber + 1;

        this.setState({ myNumber }, () => console.log(buttonId));
    }

    private readonly handleDropDownChange = (dropDownId: string, selectedOption: IOptionType | null): void => {

        const selectedOptions: IDropDownStates = this.state.selectedOptions;

        selectedOptions[dropDownId] = selectedOption;

        this.setState({ selectedOptions }, () => console.log(this.state.selectedOptions));
    }
}
