import { test, expect } from '@playwright/test';

test('each listed post loads content', async ({ page }) => {
  await page.goto('/');

  // Wait for homepage posts to be rendered by Jekyll
  await page.waitForSelector('ul > li a', { timeout: 15000 });

  // Grab first few post links by list content
  const postLinks = page.locator('ul > li a').filter({ hasText: /202/ }).first().nth(0);

  // For each of the first 3 posts, click and verify content
  for (let i = 0; i < 3; i++) {
    const link = page.locator(`ul > li a`).nth(i);
    const href = await link.getAttribute('href');
    await link.click();

    // Wait for the main content to appear on the post page
    await page.waitForSelector('main', { timeout: 15000 });

    // The URL should change to the post path (remove .html)
    const expectedPath = href!.replace(/\.html$/, '');
    await expect(page).toHaveURL(new RegExp(expectedPath));

    // The page should show some main content area
    const mainContent = page.locator('main');
    await expect(mainContent).toBeVisible();

    // Navigate back to homepage and wait for posts again
    await page.goBack();
    await page.waitForSelector('ul > li a', { timeout: 15000 });
  }
});
