import React from "react";

import "./TextBox.css";


export interface ITextBoxProps {

    className?: string;
    id: string;
    isActive: boolean;
    key?: string;
    placeholder: string;
    positionLeft?: string;
    positionTop?: string;
    width?: string;
    onClick(id: string): void;
}

export function TextBox(props: ITextBoxProps): JSX.Element {

    const textBoxClass: string = (props.isActive) ? "textBox" : "textBoxInactive";

    const className: string = (props.className !== undefined) ? `${props.className} ${textBoxClass}` : `${textBoxClass}`;

    // function onClick(): void {

    //     props.onClick(props.id);
    // }

    return (
        
        <input 
            id={props.id}
            className={className}
            style={{ left: props.positionLeft, top: props.positionTop, width: props.width }}
            type="text"
            placeholder={props.placeholder}
            spellCheck={false}
        />
          
    );
}
