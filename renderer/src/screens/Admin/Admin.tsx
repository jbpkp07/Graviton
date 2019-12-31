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

            label: "Select 16 by 9",
            onClick: this.increment
        };

        const dropDownProps: IDropDownProps = {

            id: "dropDownMenu1",
            options: [
                { label: "Select   asdfsdfsadfsadfsadfasdfasdfasdfsadfasdfasdfasdfasdfasdf 123", value: "4x3 asdfsadfsadfsadfsadfsadfsdsaf 123" },
                { label: "16 by 9", value: "16x9" },
                { label: "16 by 10", value: "16x10" }
            ],
            placeholder: "Select Options From This Menu",
            selectedOption: this.state.selectedOption,
            onChange: this.handleChange
        };


        return (
            <div>
                <Button {...buttonProps} />
                <DropDown {...dropDownProps} />
                {/* <div id="myNumber">{this.state.myNumber}</div> */}
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

    private readonly handleChange = (selectedOption: IOptionType | null): void => {

        this.setState({ selectedOption });

        console.log(selectedOption);
    }
}
