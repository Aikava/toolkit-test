import {createEffect, createEvent, createStore, merge} from "effector";
import {createRepositoryFromApi, Repository} from "./models";
import {getRepositories, getRepositoryDetails} from "./api";

export type SearchQueryParams = {
    query: string;
    page: number;
}
export const $queryParams = createStore<SearchQueryParams>({
    query: "",
    page: 1
});
const $token = createStore<string>("");

export const updateQueryParams = createEvent<Partial<SearchQueryParams>>();
export const updateQuery = createEvent<string>();
export const gotoPage = createEvent<number>();
export const useToken = createEvent<string>()

export const requestNextPage = createEvent()
export const requestPreviousPage = createEvent()

$token.on(useToken, (_, token) => token);
$queryParams.on(updateQueryParams, (prev, params) => ({ ...prev, ...params }));
$queryParams.on(gotoPage, (params, page) => ({
    ...params,
    page
}));
$queryParams.on(updateQuery, (params, query) => ({
    ...params,
    query
}));

$queryParams.on(requestNextPage, ({ page, ...store }) => ({
    page: page + 1,
    ...store
}))
$queryParams.on(requestPreviousPage, ({ page, ...store }) => ({
    page: page - 1,
    ...store
}));

export const $hasNextPage = createStore(false);
export const $hasPrevPage = createStore(false);
export const $repositories = createStore<Array<Repository>>([]);
export const $repositoryCount = createStore<number>(0);
export const $repositoryDetails = createStore<Repository>(null);

export const fetchRepositoriesFx = createEffect(async () => {
    const token = $token.getState();
    const { query, page } = $queryParams.getState();

    return getRepositories(token, { query, page: page-1 });
});

export const fetchRepositoryDetailsFx = createEffect(async (params) => {
    const token = $token.getState();

    return getRepositoryDetails(token, params);
});

$repositories.on(fetchRepositoriesFx.doneData, (_, response) => {
    return response.search.edges.map(({ node }) => createRepositoryFromApi(node));
});
$hasNextPage.on(fetchRepositoriesFx.doneData, (_, response) => {
    return response.search.pageInfo.hasNextPage;
});
$hasPrevPage.on(fetchRepositoriesFx.doneData, (_, response) => {
    return response.search.pageInfo.hasPreviousPage;
});
$repositoryCount.on(fetchRepositoriesFx.doneData, (_, response) => {
    return response.search.repositoryCount;
});

$repositoryDetails.on(fetchRepositoryDetailsFx.doneData, (_, details) => {
    return createRepositoryFromApi(details.repository);
});

merge([
    updateQueryParams,
    updateQuery,
    gotoPage,
    requestNextPage,
    requestPreviousPage
]).watch(() => {
    if (!$token.getState())
        return;
    void fetchRepositoriesFx()
})