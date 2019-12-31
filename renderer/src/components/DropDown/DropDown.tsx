import React from "react";
import { default as Select, ValueType } from "react-select";

import "./DropDown.css";


export interface IOptionType {
    label: string;
    value: string;
}

export interface IDropDownProps {

    id: string;
    options: IOptionType[];
    placeholder: string;
    selectedOption: IOptionType | null;
    onChange(selectedOption: ValueType<IOptionType>): void;
}

export function DropDown(props: IDropDownProps): JSX.Element {

    // const customStyles: Partial<Styles> = {

    // container: (_styles: CSSProperties): CSSProperties => ({
    //     // ...styles,
    //     // outline: "none",
    //     // boxShadow: "none",
    //     // border: "none"
    //     // // tslint:disable-next-line: object-literal-sort-keys
    //     // // backgroundColor: "var(--light-gray)",
    //     // // width: "300px"
    //     // // backgroundColor: "var(--light-gray)"
    // }),
    // control: (styles: CSSProperties): CSSProperties => ({
    //     ...styles,
    //     // background: "var(--light-gray)",
    //     // outline: "none",
    //     // boxShadow: "none",
    //     // border: "none"

    // }),
    // singleValue: (_styles: CSSProperties): CSSProperties => ({

    //     // ...styles,
    //     // color: "var(--light-blue)",
    //     // outline: "none",
    //     // boxShadow: "none",
    //     // border: "none"
    // })
    // input: (_provided, _state) => {


    //     const fontFamily = "Roboto-Regular";

    //     return { fontFamily };
    // }
    // };


    // setTimeout(() => {

    //     const blah: any = document.getElementsByClassName("dropDown__option");
    //     console.log(blah);
    // }, 5000);


    return (

        <Select
            id={props.id}
            value={props.selectedOption}
            onChange={props.onChange.bind(props)}
            options={props.options}
            placeholder={props.placeholder}
            className="dropDown"
            classNamePrefix="dropDown"
            isClearable={true}
        />
    );
}
