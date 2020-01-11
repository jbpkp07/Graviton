import { AdminScreen } from "./Admin";
import { IButtonProps } from "../../components/Button/Button";
import { IDropDownProps } from "../../components/DropDown/DropDown";


export interface IAdminComponentProps {

    submitButtonProps: IButtonProps;
    aspectRatioDropDownProps: IDropDownProps;
    versionDropDownProps: IDropDownProps;
}

export function getComponentProps(this: AdminScreen): IAdminComponentProps {

    const submitButtonProps: IButtonProps = {

        id: "submitButton",
        isActive: this.state.submitButtonIsActive,
        label: "Submit",
        onClick: this.submit,
        positionLeft: "150px",
        positionTop: "180px"
    };

    const aspectRatioDropDownProps: IDropDownProps = {

        id: "aspectRatioDropDown",
        onChange: this.handleDropDownChange,
        options: (this.state.lookups !== null) ? this.state.lookups.aspectRatios : null,
        placeholder: "Aspect Ratio",
        positionLeft: "150px",
        positionTop: "none",
        selectedOption: this.state.selectedOptions.aspectRatioDropDown,
        width: "200px"
    };

    const versionDropDownProps: IDropDownProps = {

        id: "versionDropDown",
        onChange: this.handleDropDownChange,
        options: (this.state.lookups !== null) ? this.state.lookups.versions : null,
        placeholder: "Version",
        positionLeft: "150px",
        positionTop: "130px",
        selectedOption: this.state.selectedOptions.versionDropDown,
        width: "200px"
    };

    return {

        submitButtonProps,

        aspectRatioDropDownProps,
        versionDropDownProps
    };
}
