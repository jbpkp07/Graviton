import { CancelTokenSource } from "axios";
import React from "react";

import "./Admin.css";
import { api } from "../../api/api";
import { API } from "../../../../shared/API";
import { getComponentProps, IAdminComponentProps } from "./componentProps";
import { DataTableAdaptor } from "../../components/DataTableAdaptor/DataTableAdaptor";
import { SideBar } from "../../components/SideBar/SideBar";


interface IAdminScreenState {

    lookups: API.ILookups | null;
}

let adminScreenState: IAdminScreenState = {

    lookups: null
};

export class AdminScreen extends React.Component {

    public readonly state: IAdminScreenState = adminScreenState;

    private readonly apiCancelToken: CancelTokenSource = api.getNewCancelToken();

    public readonly render = (): JSX.Element => {

        const componentProps: IAdminComponentProps = getComponentProps.call(this);

        return (

            <div id="adminScreen">
                <SideBar />
                <DataTableAdaptor {...componentProps.dataTableAdaptorProps} />
            </div>
        );
    }

    public readonly componentDidMount = (): void => {

        api.getLookups(this.apiCancelToken)

            .then((lookups: API.ILookups) => {

                this.setState({ lookups });
            });
    }

    public readonly componentWillUnmount = (): void => {

        this.apiCancelToken.cancel("Admin Screen");

        adminScreenState = this.state;
    }

    protected readonly handleDataTableDeleteBtnClick = (kind: keyof API.ILookupsKind, _id: string): void => {

        api.deleteLookupById(kind, _id, this.apiCancelToken)

            .then((lookups: API.ILookups) => {

                this.setState({ lookups });
            });
    }
}
