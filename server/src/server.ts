import { default as express } from "express";
import session from "express-session";
import { terminal } from "terminal-kit";

import { config } from "./config/config";
import { Controller } from "./controller/Controller";
// import { Controller } from "./controller/Controller";
import { printHeader } from "./utils/printHeader";

const app: express.Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const sessionOptions: session.SessionOptions = {

    secret: "35036ca3-7153-4b9a-a854-c21ceba18c5c", // random UUID for secret
    resave: false,
    saveUninitialized: true
};

app.use(session(sessionOptions));

// if (process.env.NODE_ENV === "production") {

app.use(express.static(config.staticAssetsPath));
// }

const controller: Controller = new Controller();


printHeader();

// const router: express.Router = express.Router();

// function sendClientApp(_request: express.Request, response: express.Response): void {

//     response.sendFile(config.htmlAssetPath);
// }

// router.use(sendClientApp);

app.use(controller.router);

// controller.connectDatabase()

//     .then(() => {

app.listen(config.port, () => {

    terminal.white("  Webserver listening on port ► ").brightGreen(`${config.port}\n\n`);
});
//     })
//     .catch((err: string) => {

//         terminal.red(err);
//     });
