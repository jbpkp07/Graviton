import React, { CSSProperties } from "react";
import { default as Select, Styles, ValueType } from "react-select";

import { API } from "../../../../shared/API";
import "./DropDown.css";


export interface IDropDownProps {

    id: string;
    options: API.TLookup[] | null;
    placeholder: string;
    positionLeft: string;
    positionTop: string;
    selectedOption: API.TLookup | null;
    width: string;
    onChange(id: string, selectedOption: ValueType<API.TLookup>): void;
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

    function onChange(selectedOption: ValueType<API.TLookup>): void {

        props.onChange(props.id, selectedOption);
    }

    if (props.options !== null) {

        function sortByOrdinal(a: API.TLookup, b: API.TLookup): number {

            return a.ordinal < b.ordinal ? 1 : -1;
        }

        props.options.sort(sortByOrdinal);
    }

    return (

        <Select
            id={props.id}
            value={props.selectedOption}
            onChange={onChange}
            options={(props.options !== null) ? props.options : [{ label: "Loading...", value: "none", ordinal: 0 }]}
            placeholder={props.placeholder}
            className="dropDown"
            classNamePrefix="dropDown"
            isClearable={true}
            styles={customStyles}
        />
    );
}
