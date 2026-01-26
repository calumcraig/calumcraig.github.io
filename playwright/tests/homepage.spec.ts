import { test, expect } from '@playwright/test';

test('each listed post loads content', async ({ page }) => {
  await page.goto('/');

  // Grab first few post links by list content
  const postLinks = page.locator('ul > li a').filter({ hasText: /202/ }).first().nth(0);

  // For each of the first 3 posts, click and verify content
  for (let i = 0; i < 3; i++) {
    const link = page.locator(`ul > li a`).nth(i);
    const href = await link.getAttribute('href');
    await link.click();

    // The URL should change to the post path
    await expect(page).toHaveURL(new RegExp(href!));

    // The page should show some main content area
    const mainContent = page.locator('main');
    await expect(mainContent).toBeVisible();

    // Navigate back to homepage
    await page.goBack();
  }
});
