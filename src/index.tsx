import * as React from "react";
import {createRoot} from "react-dom/client";
import {Application} from "./application";
import {BrowserRouter} from "react-router-dom";

const mountPoint = document.querySelector("#root");
const appRoot = createRoot(mountPoint);

appRoot.render(
    <BrowserRouter basename={"/toolkit-test"}>
        <Application />;
    </BrowserRouter>);
