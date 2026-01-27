import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  // Load homepage
  await page.goto('/');

  // Check page title
  await expect(page).toHaveTitle(/Calum Craig/i);

  // Wait for at least one post link to appear
  const firstPostLink = page.locator('a.post-link').first();
  await expect(firstPostLink).toBeVisible({ timeout: 15000 });

  // Click through to the post and wait for navigation
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'load', timeout: 15000 }),
    firstPostLink.click()
  ]);

  // Assert *any* visible H1 on the post page
  const postTitle = page.locator('h1').first();
  await expect(postTitle).toBeVisible({ timeout: 15000 });
});
