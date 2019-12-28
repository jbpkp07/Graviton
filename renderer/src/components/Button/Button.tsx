import React from "react";

import "./Button.css";


export interface IButtonProps {

    className?: string;
    key?: string;
    label: string;
    onClick(): void;
}

export function Button(props: IButtonProps): JSX.Element {

    return (

        <div 
            className={props.className !== undefined ? `${props.className} btn` : "btn"} 
            key={props.label}
            onClick={props.onClick.bind(props)}
        >
            {props.label}
        </div>
    );
}
