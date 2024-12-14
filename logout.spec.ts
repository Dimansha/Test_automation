/**
 * Overview:
 * This Playwright test script automates the logout process from the WILEY Online Library platform. 
 * It performs the following steps:
 * 1. Login: Navigates to the login page, enters the user's email and password, and logs in successfully.
 * 2. Logout: Clicks on the username/profile icon in the upper-right corner to open the dropdown menu, then selects the "Logout" option.
 * 3. Verification: Confirms successful logout by verifying the presence of the Login/Register options on the homepage.
 * 
 */


import { test, expect } from '@playwright/test';

test('Logout from WILEY Online Library', async ({ page }) => {
  // Test data
  const email = 'dimansha.nethmini@gmail.com'; //  Actual email
  const password = 'Neth98#10#01*@'; //  Actual password

  // Navigate to the login page
  await page.goto('https://wiley.scienceconnect.io/login'); //  Login URL

  // Enter email address
  await page.fill('#email-input', email); //  Selector for email input

  // Enter password
  await page.fill('#pass-input', password); //  Selector for password input

  // Click login button
  await page.click('#password-sign-in-btn'); //  Selector for button

  // Wait for redirection to the home page 
  await page.waitForURL('https://onlinelibrary.wiley.com/?logout=true'); // Home page URL

  // Click on the username displayed in the upper right
  await page.click('#indivLogin > span.icon-userprofile'); //  Selector for the username button

  // Click on the "Logout" option
  await page.click('#pb-page-content > div > div.pageHeader > header > div > div:nth-child(2) > div > div > div > div.pull-right > div > div.pull-right > div > div.navigation-login-dropdown-container > div.navigation-login-dropdown > ul > li:nth-child(2) > a'); //  Selector for the logout button

  // Verify that the user is logged out by checking the presence of the Login/Register options
  await expect(page.locator('#pb-page-content > div > div.pageHeader > header > div > div:nth-child(2) > div > div > div > div.pull-right > div > div.pull-right > div > div.navigation-login-dropdown-container > div > ul > li:nth-child(1) > a')).toBeVisible(); //  Selector for login/registration buttons
});
