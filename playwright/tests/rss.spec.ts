import { test, expect } from '@playwright/test';

test('RSS link exists and is reachable', async ({ page }) => {
  await page.goto('/');

  // Locate the RSS link
  const rssLink = page.locator('a', { hasText: 'RSS' });
  await expect(rssLink).toBeVisible();
  
  // Get the href attribute and ensure it returns 200
  const href = await rssLink.getAttribute('href');
  const response = await page.request.get(href!);
  expect(response.status()).toBe(200);
});
