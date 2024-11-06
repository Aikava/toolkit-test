import {describe, test, expect} from "vitest";
import {getRepositories, getRepositoryDetails} from "../src/api";

const token = process.env.TOKEN;
const testOwner = "octocat";
const testRepo = "Spoon-Knife"
if (!token)
    throw new Error("Token is missing");

describe("Github api calls", () => {
    describe("Repositories list", () => {
        test("Should return about 10 repositories of current user", async () => {
            const repositories = await getRepositories(token);

            expect(repositories.search.edges).toHaveLength(4);
        });

        test("Should return 10 repositories with query in title", async () => {
            const repositories = await getRepositories(token, {
                query: "hello"
            });

            expect(repositories.search.edges).toHaveLength(10);
            expect(repositories.search.edges[0].node.name).include("hello");
        });
        test("Should return 10 from 3 page", async () => {
            const repositories = await getRepositories(token, {
                query: "hello",
                page: 3
            });

            expect(repositories.search.edges).toHaveLength(10);
            expect(repositories.search)
        });
    });

    describe("Repository details", () => {
        test("Should return repository details", async () => {
            const repositoryDetails = await getRepositoryDetails(token, {
                owner: testOwner,
                repositoryName: testRepo
            });

            expect(repositoryDetails.repository).toEqual({
                    name: 'Spoon-Knife',
                    stargazerCount: 12615,
                    url: 'https://github.com/octocat/Spoon-Knife',
                    languages: {
                        nodes: [
                            {name: "HTML"},
                            {name: "CSS"}
                        ]
                    },
                    description: 'This repo is for demonstration purposes only.',
                    defaultBranchRef: {
                        target: {
                            history: {
                                nodes: [{committedDate: "2014-02-12T23:20:44Z"}]
                            }
                        }
                    },
                    owner: {
                        login: 'octocat',
                        avatarUrl: 'https://avatars.githubusercontent.com/u/583231?u=a59fef2a493e2b67dd13754231daf220c82ba84d&v=4'
                    }
                }
            )
        });
    });
});