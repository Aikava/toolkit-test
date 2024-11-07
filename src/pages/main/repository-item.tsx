import * as React from "react";
import "./style.css";
import {NavLink} from "react-router-dom";

type RepositoryItemProps = {
    url: string;
    title: string;
    stargazer: string;
}
export const RepositoryItem = ({ url, title, stargazer}: RepositoryItemProps) => {
    return (<NavLink to={url} className="repository-item">
        <div className="repository-item__label">
            {title}
        </div>
        <div className="repository-item__stargazer">{stargazer}</div>
    </NavLink>);
}