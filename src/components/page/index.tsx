import * as React from "react";
import "./style.css";

export const PageFooter = ({ children }) => {
    return (<footer className={"page-footer"}>
        <div className="page-footer__content">
            {children}
        </div>
    </footer>);
};

export const PageHeader = ({ children }) => {
    return (<header className={"page-header"}><h2>{children}</h2></header>);
}

export const PageContent = ({ children }) => {
    return (<section className="page-content">
        {children}
    </section>)
};

export const Page = ({ title, children }) => {
    return (<div className="page-wrapper">
        <PageHeader>{title}</PageHeader>
        {children}
    </div>)
};