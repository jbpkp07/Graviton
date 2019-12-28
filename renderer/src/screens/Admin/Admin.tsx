import React from "react";
import { default as Dropdown, Option as DropDownOption } from "react-dropdown";
// import { default as Select, OptionsType, OptionTypeBase, ValueType } from "react-select";

import "./Admin.css";


interface IAdminScreenState {

    myNumber: number;
    selectedOption: DropDownOption | undefined;
}

let adminScreenState: IAdminScreenState = {

    myNumber: 0,
    selectedOption: undefined
};


const options: DropDownOption[] = [

    { label: "4 x 3", value: "4x3" },
    { label: "16 x 9", value: "16x9" },
    { label: "16 x 10", value: "16x10" }
];


export class AdminScreen extends React.Component {

    public readonly state: IAdminScreenState;

    public constructor(props: any) {

        super(props);

        this.state = adminScreenState;
    }

    // public readonly componentDidMount = (): void => {

    //     this.setState(persistentState);
    // }

    public readonly render = (): JSX.Element => {

        return (
            <div>
                <div className="btn" onClick={this.increment}>Admin Button</div>
                <div id="myNumber">{this.state.myNumber}</div>
                <Dropdown 
                    options={options} 
                    onChange={this.handleChange}
                    value={this.state.selectedOption}
                    placeholder="Select an option" 
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

        console.log(`Option selected: ${selectedOption.toString()}`);
    }
}
