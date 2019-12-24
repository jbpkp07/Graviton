import React from "react";

import { EScreen } from "../../App/App";
import "./NavBar.css";


export interface INavBarProps {

    currentScreen: EScreen;
    selectScreen(screen: EScreen): void;
}

export function NavBar(props: INavBarProps): JSX.Element {

    function renderLink(screen: EScreen): JSX.Element {

        if (props.currentScreen === screen) {

            return (

                <div className="navBarLink navBarActiveLink" key={screen}>
                    {screen}
                </div>
            );
        }

        function selectScreen(): void { props.selectScreen(screen); }

        return (

            <div className="navBarLink navBarInActiveLink btn" key={screen} onClick={selectScreen}>
                {screen}
            </div>
        );
    }

    return (

        <div id="navBar">
            {Object.values(EScreen).map(renderLink)}
        </div>
    );
}
