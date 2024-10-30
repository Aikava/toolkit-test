import { test, expect } from "@playwright/test";

test.describe("Application", async () => {
    test("Site title", async ({ page }) => {
        await page.goto("http://localhost:5173");

        await expect(page).toHaveTitle("Repository viewer");
    });
});