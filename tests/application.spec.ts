import { test, expect } from "@playwright/test";

test.describe("List page", async () => {
    //
    test("Site title", async ({ page }) => {
        await page.goto("http://localhost:5173");

        await expect(page).toHaveTitle("Repository viewer");
    });

    test("Search bar", async ({ page }) => {
        await page.goto("http://localhost:5173");
        const searchBar = page.locator(".search-bar");

        await expect(searchBar).toHaveText("Search");
    });

    test("Repository list", async () => {});

    test("Paginator", async () => {});
});

test.describe("Repository details", async () => {
    // check by repository id

});