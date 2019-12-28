import React from "react";
import { default as Dropdown, Option as DropDownOption } from "react-dropdown";
// tslint:disable-next-line: no-submodule-imports
import "react-dropdown/style.css";

import "./Admin.css";
import { Button, IButtonProps } from "../../components/Button/Button";
// import { default as Select, OptionsType, OptionTypeBase, ValueType } from "react-select";



interface IAdminScreenState {

    myNumber: number;
    selectedOption: DropDownOption | undefined;
}

let adminScreenState: IAdminScreenState = {

    myNumber: 0,
    selectedOption: undefined
};


const options: DropDownOption[] = [

    { label: "4 by 3", value: "4x3" },
    { label: "16 by 9", value: "16x9" },
    { label: "16 by 10", value: "16x10" }
];


export class AdminScreen extends React.Component {

    public readonly state: IAdminScreenState = adminScreenState;

    public readonly render = (): JSX.Element => {

        const buttonProps: IButtonProps = {

            label: "Admin Button",
            onClick: this.increment
        };

        return (
            <div>
                <Button {...buttonProps} />
                <div id="myNumber">{this.state.myNumber}</div>
                <Dropdown
                    className="dropDown" 
                    options={options} 
                    onChange={this.handleChange}
                    value={this.state.selectedOption}
                    placeholder="Admin Button" 
                />
            </div>
        );
    }

    public readonly componentWillUnmount = (): void => {

        adminScreenState = this.state;
    }

    private readonly increment = (): void => {

        const myNumber: number = this.state.myNumber + 1;

        this.setState({ myNumber });
    }

    private readonly handleChange = (selectedOption: DropDownOption): void => {

        this.setState({ selectedOption });

        console.log(`Option selected: ${selectedOption.value}`);
    }
}
