import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  // Load homepage
  await page.goto('/');

  // Check page title
  await expect(page).toHaveTitle(/Calum Craig/i);

  // Wait for at least one post link to appear
  const firstPostLink = page.locator('a.post-link').first();
  await expect(firstPostLink).toBeVisible({ timeout: 15000 });

  // Capture the href Jekyll actually generated
  const href = await firstPostLink.getAttribute('href');
  expect(href).toBeTruthy();

  // Click through to the post
  await firstPostLink.click();

  // Wait for navigation to the post URL (pretty URLs or .html both OK)
  await page.waitForURL(`**${href}`, { timeout: 15000 });

  // Assert *any* visible H1 on the post page
  const postTitle = page.locator('h1').first();
  await expect(postTitle).toBeVisible({ timeout: 15000 });
});
