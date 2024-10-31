import * as React from "react";
import {createRoot} from "react-dom/client";
import {Application} from "./application";

const mountPoint = document.querySelector("#app");
const appRoot = createRoot(mountPoint);

appRoot.render(<Application/>);
