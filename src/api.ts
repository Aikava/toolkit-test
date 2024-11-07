import {graphql} from "@octokit/graphql";

type QueryParams = {
    query: string;
    after: string;
}
const QUERY_SEARCH = ({query, after}: QueryParams) => `query {
    search(query: "${query}", type: REPOSITORY, first: 10, after: "${after}") {
        repositoryCount,
        pageInfo { hasNextPage, hasPreviousPage },
        edges {
            node {
                ... on Repository {
                    name,
                    stargazerCount,
                    url,
                    languages(first: 100) { nodes { name } },
                    description,
                    defaultBranchRef {
                        target {
                            ... on Commit {
                                history(first: 1) {
                                    nodes { committedDate }
                                }
                            }
                        }
                    },
                    owner { login, avatarUrl }
                }
            }
        }
    }
}`;

type RepositoryNode = {
    name: string;
    stargazerCount: number;
    url: string;
    description: string;
    languages: Array<{ name: string; }>;
    defaultBranchRef?: {
        target: {
            history: {
                nodes: Array<{ committedDate: string; }>;
            }
        }
    }
};
type RepositoriesQuery = {
    repositoryCount: number;
    pageInfo: {
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    },
    owner: {
        login: string;
        avatarUrl: string;
    },
    edges: Array<{ node: RepositoryNode }>
};
type RepositoriesResponse = { search: RepositoriesQuery };
type GetRepositoriesProps = {
    query?: string;
    page?: number;
};
export async function getRepositories(token: string, params: GetRepositoriesProps = {}): Promise<RepositoriesResponse> {
    const query = params.query ? `${params.query} in:name` : "user:@me";
    const after = btoa(`cursor:${(params.page || 0) * 10}`);

    return graphql(QUERY_SEARCH({ query, after }), {
        headers: {authorization: `token ${token}`}
    });
}

const DETAILS_QUERY = (owner: string, repository: string) => {
    return `query {
    repository(owner:"${owner}", name:"${repository}") {
        name,
        stargazerCount,
        url,
        languages(first: 100) { nodes { name } },
        description,
        defaultBranchRef {
            target {
                ... on Commit {
                    history(first: 1) {
                        nodes { committedDate }
                    }
                }
            }
        },
      owner { login, avatarUrl }
  }
}`;
}
type RepositoryDetailsParams = {
    owner: string;
    repositoryName: string;
};

type RepositoryDetailsQuery = Pick<RepositoryDetailsParams, "owner"> & RepositoryNode;
type RepositoryDetailsResponse = { repository: RepositoryDetailsQuery };
export async function getRepositoryDetails(token: string, { owner, repositoryName }: RepositoryDetailsParams): Promise<RepositoryDetailsResponse> {
    if (!owner)
        throw new Error("Repository owner login required");

    if (!repositoryName)
        throw new Error("Repository name required");

    return await graphql(DETAILS_QUERY(owner, repositoryName), {
        headers: {authorization: `token ${token}`}
    });
}