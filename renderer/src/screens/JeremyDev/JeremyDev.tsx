import { CancelTokenSource } from "axios";
import React from "react";

import { api } from "../../api/api";
import { API } from "../../../../shared/API";
import { Button } from "../../components/Button/Button";
import { getComponentProps, IJeremyDevComponentProps } from "./componentProps";
import { DataTableAdaptor } from "../../components/DataTableAdaptor/DataTableAdaptor";
import { DropDown } from "../../components/DropDown/DropDown";
import "./JeremyDev.css";


interface IDropDownStates {

    [key: string]: API.ILookup | null;
    aspectRatioDropDown: API.ILookup | null;
    versionDropDown: API.ILookup | null;
}

interface IJeremyDevScreenState {

    lookups: API.ILookups | null;
    selectedOptions: IDropDownStates;
    submitButtonIsActive: boolean;
}

let jeremyDevScreenState: IJeremyDevScreenState = {

    lookups: null,
    selectedOptions: {

        aspectRatioDropDown: null,
        versionDropDown: null
    },
    submitButtonIsActive: false
};

export class JeremyDevScreen extends React.Component {

    public readonly state: IJeremyDevScreenState = jeremyDevScreenState;

    private readonly apiCancelToken: CancelTokenSource = api.getNewCancelToken();

    public readonly render = (): JSX.Element => {

        const componentProps: IJeremyDevComponentProps = getComponentProps.call(this);

        return (

            <div id="jeremyDevScreen">
                <Button   {...componentProps.submitButtonProps} />
                <DropDown {...componentProps.aspectRatioDropDownProps} />
                <DropDown {...componentProps.versionDropDownProps} />
                <DataTableAdaptor {...componentProps.dataTableAdaptorProps} />
                <DataTableAdaptor {...componentProps.dataTableAdaptorProps2} />
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

        this.apiCancelToken.cancel("Jeremy Dev Screen");

        jeremyDevScreenState = this.state;
    }

    protected readonly submit = (_buttonId: string): void => {

        const selectedOptions: IDropDownStates = this.state.selectedOptions;

        Object.keys(selectedOptions).forEach((key: string) => {

            selectedOptions[key] = null;
        });

        const submitButtonIsActive: boolean = false;

        this.setState({ selectedOptions, submitButtonIsActive }, () => console.log(this.state.selectedOptions));
    }

    protected readonly handleDropDownChange = (dropDownId: string, selectedOption: API.ILookup | null): void => {

        const selectedOptions: IDropDownStates = this.state.selectedOptions;

        selectedOptions[dropDownId] = selectedOption;

        const submitButtonIsActive: boolean = !Object.values(selectedOptions).some((option: API.ILookup | null) => option === null);

        this.setState({ selectedOptions, submitButtonIsActive }, () => console.log(this.state.selectedOptions));
    }

    protected readonly handleDataTableDeleteBtnClick = (kind: keyof API.ILookupsKind, _id: string): void => {

        api.deleteLookupById(kind, _id, this.apiCancelToken)

            .then((lookups: API.ILookups) => {

                this.setState({ lookups });
            });
    }
}
