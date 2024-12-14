/**
 * Overview:
 * This Playwright test script automates the user registration process for the WILEY Online Library using a Google account. 
 * It performs the following steps:
 * 1. Navigation: Opens the WILEY Online Library registration page.
 * 2. Google Registration: Selects Google as the registration platform and handles the Google login popup by entering credentials and granting permissions (if required).
 * 3. Verification: Confirms successful registration by verifying the presence of a dashboard element on the redirected page.
 * 
 */


import { test, expect } from '@playwright/test';

test.describe('WILEY Online Library - User Registration via Google', () => {
  test('Registration using Google account', async ({ page, context }) => {
    // Step 1: Navigate to the registration page
    await page.goto('https://onlinelibrary.wiley.com/'); 

    // Step 2: Select "Google" as the registration platform
    const googleButton = page.locator('#root > div.MuiContainer-root.MuiContainer-disableGutters.css-5mappb > div > div.MuiPaper-root.MuiPaper-auth.MuiPaper-rounded.MuiCard-root.css-13ckzyy > div.MuiBox-root.css-4aqbol > button:nth-child(1) > span.MuiTypography-root.MuiTypography-default.css-1f5rw7d'); // Update selector if necessary
    await googleButton.click();

    // Step 3: Handle Google login in a new popup
    const [googlePopup] = await Promise.all([
      context.waitForEvent('page'), // Wait for Google login popup
      googleButton.click(), // Trigger the popup
    ]);

    // Step 4: Perform Google login
    await googlePopup.fill('input[type="email"]', 'dimansha.nethmini@gmail.com');
    await googlePopup.click('button:has-text("Next")'); // Continue to password
    await googlePopup.fill('input[type="password"]', 'Neth98#10#01*@'); 
    await googlePopup.click('button:has-text("#identifierNext")'); // Complete login

    // Step 5: Grant permissions (if prompted)
    const grantPermissionButton = googlePopup.locator('button:has-text("Allow")');
    if (await grantPermissionButton.isVisible()) {
      await grantPermissionButton.click();
    }

    // Step 6: Verify successful registration and redirection
    await page.click('#submit-button');
    const dashboardElement = page.locator('#pb-page-content > div > div.pageHeader > header > div > div:nth-child(2) > div > div > div > div.pull-left'); //  Selector for dashboard verification
    await expect(dashboardElement).toBeVisible();

    console.log('Test Passed: Registration completed successfully');
  });
});
