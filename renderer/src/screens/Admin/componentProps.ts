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
        positionLeft: "150px",
        positionTop: "180px",
        onClick: this.submit
    };

    const aspectRatioDropDownProps: IDropDownProps = {

        id: "aspectRatioDropDown",
        options: (this.state.lookups !== null) ? this.state.lookups.aspectRatios : null,
        placeholder: "Aspect Ratio",
        positionLeft: "150px",
        positionTop: "none",
        selectedOption: this.state.selectedOptions.aspectRatioDropDown,
        width: "145px",
        onChange: this.handleDropDownChange
    };

    const versionDropDownProps: IDropDownProps = {

        id: "versionDropDown",
        options: (this.state.lookups !== null) ? this.state.lookups.versions : null,
        placeholder: "Version",
        positionLeft: "150px",
        positionTop: "130px",
        selectedOption: this.state.selectedOptions.versionDropDown,
        width: "145px",
        onChange: this.handleDropDownChange
    };

    return {

        submitButtonProps,
        aspectRatioDropDownProps,
        versionDropDownProps
    };
}
