// tslint:disable: max-line-length
import { terminal } from "terminal-kit";

const xCoord: number = 1;
const yCoord: number = 15;

export function printHeader(): void {

    terminal.reset();
    terminal.clear();
    terminal("\n");
    terminal.magenta(" ┌─────────────────────────────────────────────────────────────────────────────┐\n");
    terminal.magenta(" │").brightWhite.bgMagenta("                               Graviton server                               ").magenta("│\n");
    terminal.magenta(" │").brightMagenta("                                   Spafax                                    ").magenta("│\n");
    terminal.magenta(" │").gray("                          written by: Jeremy Barnes                          ").magenta("│\n");
    terminal.magenta(" ├─────────────────────────────────────────────────────────────────────────────┤\n");
    terminal.magenta(" │").brightCyan(" Usage       : ").white("node ./build/server.js").gray(" or ").white("npm start").gray(" will start this webserver.").magenta("│\n");
    terminal.magenta(" │                                                                             │\n");
    terminal.magenta(" │").brightCyan(" Description : ").gray("Welcome to Graviton, a media asset management application.").magenta("    │\n");
    terminal.magenta(" │").gray("               This screen means the webserver is running...").magenta("                 │\n");
    terminal.magenta(" │                                                                             │\n");
    terminal.magenta(" │").brightCyan(" To Exit     : ").gray("Pressing ").white("[ctrl + c]").gray(" will stop this webserver and exit.").magenta("        │\n");
    terminal.magenta(" └─────────────────────────────────────────────────────────────────────────────┘");
    terminal("\n\n");
}

export function moveCursorToTop(): void {

    terminal.moveTo(xCoord, yCoord);
}

export function clearScreenBelowHeader(): void {

    moveCursorToTop();

    terminal.eraseDisplayBelow();
}
