import React from "react";
import { default as Select, ValueType } from "react-select";

import "./DropDown.css";


export interface IOptionType {
    label: string;
    value: string;
}

export interface IDropDownProps {

    options: IOptionType[];
    selectedOption: IOptionType | null;
    onChange(selectedOption: ValueType<IOptionType>): void;
}

export function DropDown(props: IDropDownProps): JSX.Element {

    // const customStyles: Partial<Styles> = {

    //     // container: (_styles: CSSProperties): CSSProperties => ({
    //     //     // ...styles,
    //     //     // outline: "none",
    //     //     // boxShadow: "none",
    //     //     // border: "none"
    //     //     // // tslint:disable-next-line: object-literal-sort-keys
    //     //     // // backgroundColor: "var(--light-gray)",
    //     //     // // width: "300px"
    //     //     // // backgroundColor: "var(--light-gray)"
    //     // }),
    //     // control: (styles: CSSProperties): CSSProperties => ({
    //     //     ...styles,
    //     //     // background: "var(--light-gray)",
    //     //     // outline: "none",
    //     //     // boxShadow: "none",
    //     //     // border: "none"

    //     // }),
    //     // singleValue: (_styles: CSSProperties): CSSProperties => ({

    //     //     // ...styles,
    //     //     // color: "var(--light-blue)",
    //     //     // outline: "none",
    //     //     // boxShadow: "none",
    //     //     // border: "none"
    //     // })
    // };


    return (

        <Select
            value={props.selectedOption}
            onChange={props.onChange.bind(props)}
            options={props.options}
            placeholder="Select Aspect Ratio"
            className="dropDown"
            classNamePrefix="dropDown"
            // styles={customStyles}
        />
    );
}
