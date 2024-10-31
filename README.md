# Test assignment for [tool-kit.tech](https://tool-kit.tech)

## Context and scope
Using [Github GraphQL API](https://docs.github.com/en/graphql), create a frontend application to preview information about repositories.

## Technical description
Application should utilize:
- Vite
- Typescript
- React
- GraphQL
- Effector
- Playwright or Cypress for e2e
- vitest and react-testing-library for unit

The architecture of the application should follow the FSD approach.

## Functional description
Application should provide search, pagination, repositories list, and detailed information about selected repository.
Components and APIs should be covered in E2E and unit tests.
Applications shows by default the current user repo.
The list of repos should be limited to 10 repos on page.
After page reload, state applications, including search and page, should be saved.
Search should be implemented with API.

## UI/UX

**Main page**

The main page has the next components:
- Repository search bar
- Repository list
- Paginator

Clicking on the repo name should open detailed repo information.

**Repository details page**

This page should have the next components:
- Repository name
- Amount of repo stars
- Last commit date
- Photo of repo owner (if presented)
- Owner nickname with a link
- List of used programming languages
- Short repository description
