import * as React from "react";
import "./style.css";

type RepositoryItemProps = {
    url: string;
    title: string;
    stargazer: string;
}
export const RepositoryItem = ({ url, title, stargazer}: RepositoryItemProps) => {
    return (<a href={url} className="repository-item">
        <div className="repository-item__label">
            {title}
        </div>
        <div className="repository-item__stargazer">{stargazer}</div>
    </a>);
}