import React, { CSSProperties } from "react";
import { default as Select, Styles, ValueType } from "react-select";

import "./DropDown.css";


export interface IOptionType {
    label: string;
    value: string;
}

export interface IDropDownProps {

    id: string;
    options: IOptionType[];
    placeholder: string;
    positionLeft: string;
    positionTop: string;
    selectedOption: IOptionType | null;
    width: string;
    onChange(id: string, selectedOption: ValueType<IOptionType>): void;
}

export function DropDown(props: IDropDownProps): JSX.Element {

    const customStyles: Partial<Styles> = {

        container: (styles: CSSProperties): CSSProperties => ({
            ...styles,
            // tslint:disable-next-line: object-literal-sort-keys
            left: props.positionLeft,
            top: props.positionTop,
            width: props.width
        })
    };

    function onChange(selectedOption: ValueType<IOptionType>): void {

        props.onChange(props.id, selectedOption);
    }

    return (

        <Select
            id={props.id}
            value={props.selectedOption}
            onChange={onChange}
            options={props.options}
            placeholder={props.placeholder}
            className="dropDown"
            classNamePrefix="dropDown"
            isClearable={true}
            styles={customStyles}
        />
    );
}
