import { AdminScreen } from "./Admin";
import { IDataTableAdaptorProps } from "../../components/DataTableAdaptor/DataTableAdaptor";


export interface IAdminComponentProps {

    dataTableAdaptorProps: IDataTableAdaptorProps;
}

export function getComponentProps(this: AdminScreen): IAdminComponentProps {

    const dataTableAdaptorProps: IDataTableAdaptorProps = {

        allowRowDelete: true,
        dataObjectArray: (this.state.lookups !== null) ? this.state.lookups.languages : null,
        handleDeleteBtnClick: this.handleDataTableDeleteBtnClick,
        maxWidth: "1200px",
        pageLength: 10,
        positionLeft: "220px",
        positionTop: "0px",
        tableKind: "languages",
        tableLayout: "ILookupLanguage",
        wrapperId: "adminScreenTable"
    };

    return {

        dataTableAdaptorProps
    };
}
