import React from "react";

import { Button, IButtonProps } from "../../components/Button/Button";
import "./DanielDev.css";
import { ITextBoxProps, TextBox } from "../../components/TextBox/TextBox";


export function DanielDevScreen(): JSX.Element {

    const submitButtonProps: IButtonProps = {

        id: "submitButton",
        isActive: true,
        label: "Submit",
        onClick: (): void => {},
        positionLeft: "150px",
        positionTop: "180px"
    };

    const TextBoxProps: ITextBoxProps = {

        id: "movieNameTextBox",
        isActive: true,
        onChange: (id: string, value: string): void => console.log(`id: ${id}\nvalue: ${value}`),
        placeholder: "Movie name",
        positionLeft: "150px",
        positionTop: "220px",
        title: "movie name",
        width: "200px"
    };

    return (

        <div id="danielDevScreen">
            <Button {...submitButtonProps} />
            <TextBox {...TextBoxProps} />
        </div>
    );
}
