export const createUserFromApi = data => {
    const user = new User();
    user.avatarUrl = data.avatarUrl;
    user.login = data.login;
    user.name = data.name;

    return user;
}

export const
    createRepositoryFromApi = data => {
        const repository = new Repository();
        repository.id = data.id;
        repository.description = data.description;
        repository.url = data.url;
        repository.name = data.name;
        repository.languages = data.languages.nodes.map(lang => lang.name);
        repository.stargazer = data.stargazerCount;
        repository.lastCommitDate = data.defaultBranchRef.target.history.nodes[0].committedDate;
        repository.owner = createUserFromApi(data.owner);

        return repository;
    }

export class User {
    name: string;
    avatarUrl: string;
    login: string;
}

export class Repository {
    id: string;
    name: string;
    stargazer: string;
    lastCommitDate: string;
    url: string;
    languages: string[];
    description: string;
    owner: User;
}
