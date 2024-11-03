import * as React from "react";
import {ReactNode} from "react";
import "./style.css";

export const Sticky = ({ children }: { children: ReactNode }) => {
    return (<div className="sticky">
        {children}
    </div>);
}