import { IButtonProps } from "../../components/Button/Button";
import { IDataTableAdaptorProps } from "../../components/DataTableAdaptor/DataTableAdaptor";
import { IDropDownProps } from "../../components/DropDown/DropDown";
import { JeremyDevScreen } from "./JeremyDev";


export interface IJeremyDevComponentProps {

    aspectRatioDropDownProps: IDropDownProps;
    dataTableAdaptorProps: IDataTableAdaptorProps;
    dataTableAdaptorProps2: IDataTableAdaptorProps;
    submitButtonProps: IButtonProps;
    versionDropDownProps: IDropDownProps;
}

export function getComponentProps(this: JeremyDevScreen): IJeremyDevComponentProps {

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

    const dataTableAdaptorProps: IDataTableAdaptorProps = {

        allowRowDelete: true,
        dataObjectArray: (this.state.lookups !== null) ? this.state.lookups.aspectRatios : null,
        handleDeleteBtnClick: this.handleDataTableDeleteBtnClick,
        maxWidth: "600px",
        pageLength: 3,
        positionLeft: "0px",
        positionTop: "250px",
        tableKind: "aspectRatios",
        tableLayout: "ILookup",
        wrapperId: "jeremyTable"
    };

    const dataTableAdaptorProps2: IDataTableAdaptorProps = {

        allowRowDelete: true,
        dataObjectArray: (this.state.lookups !== null) ? this.state.lookups.languages : null,
        handleDeleteBtnClick: this.handleDataTableDeleteBtnClick,
        maxWidth: "1000px",
        pageLength: 2,
        positionLeft: "0px",
        positionTop: "600px",
        tableKind: "languages",
        tableLayout: "ILookupLanguage",
        wrapperId: "jeremyTable2"
    };

    return {

        aspectRatioDropDownProps,
        dataTableAdaptorProps,
        dataTableAdaptorProps2,
        submitButtonProps,
        versionDropDownProps
    };
}
