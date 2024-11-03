import {PageContent, PageFooter, Page, Paginator, SearchBar, Sticky} from "../../components";
import * as React from "react";
import {useEffect} from "react";
import {
    $hasNextPage,
    $hasPrevPage,
    $queryParams,
    $repositories,
    $repositoryCount,
    fetchRepositoriesFx,
    gotoPage,
    requestNextPage,
    requestPreviousPage,
    SearchQueryParams,
    updateQuery,
    updateQueryParams,
} from "../../store";
import {useList, useUnit} from "effector-react";
import {useSearchParams, createSearchParams} from "react-router-dom";
import {RepositoryItem} from "./repository-item";
import {Repository} from "../../models";

const getObjectFromURLSearchParams = (params: URLSearchParams): SearchQueryParams => {
    return Object.assign({},
        { page: parseInt(params.get("page")) || 1 },
        { query: params.get("query") })
};

const renderItem = ({ name, owner, stargazer }: Repository, index: number) => {
    const url = `/${name}?owner=${owner.login}`;

    return (<RepositoryItem url={url} title={name} stargazer={stargazer} key={index} />);
}
export const MainPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        updateQueryParams(getObjectFromURLSearchParams(searchParams));
    }, []);

    const repositories = useList($repositories, renderItem);
    const hasNextPage = useUnit($hasNextPage);
    const hasPrevPage = useUnit($hasPrevPage);
    const queryParams = useUnit($queryParams);
    const { query, page } = queryParams;
    const count = useUnit($repositoryCount);
    const loading = useUnit(fetchRepositoriesFx.pending);

    useEffect(() => {
        setSearchParams(createSearchParams(
            Object.assign({},
                query ? { query } : {},
                page > 1 ? { page: page.toString() } : {})));
    }, [queryParams]);

    return (<Page title="Repository list">
            <PageContent>
                <Sticky>
                    <SearchBar
                        disabled={loading}
                        onChange={updateQuery} value={query} />
                </Sticky>
                {repositories}
            </PageContent>
            <PageFooter>
                <Paginator
                    disabled={loading}
                    onGoTo={gotoPage}
                    hasNextPage={hasNextPage}
                    hasPrevPage={hasPrevPage}
                    currentPage={page}
                    onNext={requestNextPage}
                    onPrev={requestPreviousPage}
                    total={count}
                />
            </PageFooter>
        </Page>
    );
};