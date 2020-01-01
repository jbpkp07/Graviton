import React from "react";

import "./Button.css";


export interface IButtonProps {

    className?: string;
    id: string;
    key?: string;
    label: string;
    positionLeft?: string;
    positionTop?: string;
    onClick(id: string): void;
}

export function Button(props: IButtonProps): JSX.Element {

    function onClick(): void {

        props.onClick(props.id);
    }

    return (

        <div
            id={props.id} 
            className={props.className !== undefined ? `${props.className} button` : "button"} 
            key={props.id}
            style={{ left: props.positionLeft, top: props.positionTop }}
            onClick={onClick}
        >
            {props.label}
        </div>
    );
}
