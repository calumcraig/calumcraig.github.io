import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// Ensure the screenshots directory exists
const screenshotsDir = path.join(process.cwd(), 'Test_screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

test('homepage loads', async ({ page }) => {
  try {
    // Load homepage
    await page.goto('/');
    await expect(page).toHaveTitle(/Calum Craig/i);

    // Wait for at least one post link
    const firstPostLink = page.locator('a.post-link').first();
    await expect(firstPostLink).toBeVisible({ timeout: 20000 });

    // Click through to the post and wait for load
    await Promise.all([
      page.waitForLoadState('load'),
      firstPostLink.click()
    ]);

    // Wait for main content to render
    const postContent = page.locator('main');
    await expect(postContent).toBeVisible({ timeout: 20000 });

    // Assert the H1 inside main
    const postTitle = postContent.locator('h1').first();
    await expect(postTitle).toBeVisible({ timeout: 20000 });

    // Optional: log the H1 text for CI debugging
    console.log('Post title text:', await postTitle.textContent());

  } catch (err) {
    // Generate timestamped filenames
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const screenshotPath = path.join(screenshotsDir, `failure-screenshot-${timestamp}.png`);
    const htmlPath = path.join(screenshotsDir, `failure-page-${timestamp}.html`);

    // Take screenshot
    await page.screenshot({ path: screenshotPath, fullPage: true });

    // Save page HTML
    fs.writeFileSync(htmlPath, await page.content());

    console.error(`Test failed. Screenshot saved to: ${screenshotPath}`);
    console.error(`HTML saved to: ${htmlPath}`);

    throw err; // rethrow to fail the test
  }
});
