import React from "react";

import { EScreen } from "../../App/App";
import "./NavBar.css";


export interface INavBarProps {

    currentScreen: EScreen;
    selectScreen(screen: EScreen): void;
}

export function NavBar(props: INavBarProps): JSX.Element {

    // function selectScreen(screen: EScreen): void {

    //     props.selectScreen(screen);
    // }

    function renderLink(screen: EScreen): JSX.Element {

        const className: string = `navBarLink ${props.currentScreen === screen ? "navBarActiveLink" : ""}`;

        return (

            <div className={className} key={screen} onClick={(): void => props.selectScreen(screen)}>{screen}</div>
        );
    }

    return (

        <div id="navBar">
            {Object.values(EScreen).map(renderLink)}
        </div>
    );
}
