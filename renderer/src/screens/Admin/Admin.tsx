import React from "react";

import "./Admin.css";
import { Button, IButtonProps } from "../../components/Button/Button";
import { DropDown, IDropDownProps, IOptionType } from "../../components/DropDown/DropDown";


interface IAdminScreenState {

    myNumber: number;
    selectedOption: IOptionType | null;
}

let adminScreenState: IAdminScreenState = {

    myNumber: 0,
    selectedOption: null
};


export class AdminScreen extends React.Component {

    public readonly state: IAdminScreenState = adminScreenState;

    public readonly render = (): JSX.Element => {

        const buttonProps: IButtonProps = {

            label: "Admin Button",
            onClick: this.increment
        };

        const dropDownProps: IDropDownProps = {

            options: [
                { label: "4 by 3   asdfsdfsadfsadfsadfasdfasdfasdfsadfasdfasdfasdfasdfasdf", value: "4x3 asdfsadfsadfsadfsadfsadfsdsaf" },
                { label: "16 by 9", value: "16x9" },
                { label: "16 by 10", value: "16x10" }
            ],
            selectedOption: this.state.selectedOption,
            onChange: this.handleChange
        };


        return (
            <div>
                <DropDown {...dropDownProps} />
                <Button {...buttonProps} />
                <div id="myNumber">{this.state.myNumber}</div>
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

    private readonly handleChange = (selectedOption: IOptionType): void => {

        this.setState({ selectedOption });

        console.log(selectedOption.value);
    }
}
