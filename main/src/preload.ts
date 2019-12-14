// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

window.addEventListener("DOMContentLoaded", (): void => {

    const replaceText: Function = (selector: string, text: string): void => {

        const element: HTMLElement | null = document.getElementById(selector);

        if (element !== null) {

            element.innerText = text;
        }
    };

    for (const app of ["chrome", "node", "electron"]) {

        // @ts-ignore
        replaceText(`${app}-version`, process.versions[app]);
    }
});
