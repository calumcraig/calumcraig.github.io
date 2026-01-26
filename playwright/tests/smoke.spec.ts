import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  // Load homepage
  await page.goto('/');

  // Check page title
  await expect(page).toHaveTitle(/Calum Craig/i);

  // Check first blog post loads
  const firstPostLink = page.locator('a.post-link[href="/2026/01/07/AI_in_QA.html"]');
  await firstPostLink.click();

  // Ensure the post content is visible
  const postTitle = page.locator('article h1').first();
  await expect(postTitle).toBeVisible();

});
