import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  // Load homepage
  await page.goto('/');

  // Check page title
  await expect(page).toHaveTitle(/Calum Craig/i);

  // Wait for posts to appear on homepage
  await page.waitForSelector('a.post-link', { timeout: 15000 });

  // Check first blog post loads
  const firstPostLink = page.locator('a.post-link[href="/2026/01/07/AI_in_QA.html"]');
  await firstPostLink.click();

  // Wait for the post content to appear
  await page.waitForSelector('main h1', { timeout: 15000 });

  const postTitle = page.locator('main h1').first();
  await expect(postTitle).toBeVisible();
});
