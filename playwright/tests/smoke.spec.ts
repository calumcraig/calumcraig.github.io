import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  // Load homepage
  await page.goto('/');

  // Check page title
  await expect(page).toHaveTitle(/Calum Craig/i);

  // Wait for posts to appear on homepage
  const firstPostLink = page.locator('a.post-link').first();
  await firstPostLink.waitFor({ state: 'visible', timeout: 15000 });

  // Grab href dynamically and click
  const href = await firstPostLink.getAttribute('href');
  await firstPostLink.click();

  // Wait for the post page main content
  await page.waitForSelector('main', { timeout: 15000 });

  // Ensure the post title exists and is visible
  const postTitle = page.locator('main h1');
  await expect(postTitle).toHaveCount(1);
  await expect(postTitle).toBeVisible();
});
