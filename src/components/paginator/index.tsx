import * as React from "react";
import {PropsWithChildren, useEffect, useState} from "react";
import "./style.css";

type PaginatorProps = {
    currentPage: number;
    total: number;
    pageSize?: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    onNext: () => void;
    onPrev: () => void;
    onGoTo: (page: number) => void;
    disabled: boolean;
}

type PageNumberProps = {
    onClick?: () => void;
    active: boolean;
}
const PageButton = ({ onClick, active, children }: PropsWithChildren<PageNumberProps>) => {
    return (<div className={`page-button ${active ? "page-button--active" : ""}`} onClick={onClick}>
        <span className="page-button__label">{children}</span>
    </div>);
}

export const Paginator = (props: PaginatorProps) => {
    const { disabled, hasNextPage, hasPrevPage, currentPage, total, pageSize = 10, onNext, onPrev, onGoTo } = props;
    const [pageNumbers, setPageNumbers] = useState([]);

    useEffect(() => {
        const pages = [];
        const startPage = Math.max(1, currentPage - 4);

        for (let i = startPage; i < Math.ceil(total/pageSize); i++) {
            if (pages.length >= 10)
                break;
            pages.push(i);
        }

        setPageNumbers(pages);
    }, [total, pageSize, currentPage]);

    return (<section className={"paginator"}>
        <button
            className={"page-button"}
            disabled={disabled || !hasPrevPage}
            onClick={onPrev}
            type={"button"}>
            &lt;
        </button>
        <div className={`paginator__value${disabled ? " paginator__value--disabled" : ""}`}>
            { pageNumbers.map(((pageNumber, index) => <PageButton
                onClick={() => !disabled && onGoTo(pageNumber)}
                active={pageNumber===currentPage}
                key={index}
            >{pageNumber}</PageButton>))}
            </div>
        <button
            className={"page-button"}
            disabled={disabled || !hasNextPage}
            onClick={onNext}
            type={"button"}>
            &gt;
        </button>
    </section>);
}