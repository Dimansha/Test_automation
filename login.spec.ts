/*
 * Overview:
 * This Playwright test script automates and validate the login functionality for the application, including:
 * - Verification code handling.
 * - Password creation after successful verification.
 * 
 * Test Scenarios:
 * 1. Navigate to the login page.
 * 2. Enter a valid email and trigger the sign-in process.
 * 3. Validate the OTP input field functionality.
 * 4. Verify successful redirection upon valid login.
 */


import { test, expect } from '@playwright/test';

test('User Login with Verification Code and Password Creation', async ({ page }) => {
  // Step 1: Navigate to the login page
  const loginPageURL = 'https://wiley.scienceconnect.io/login'; // Login page  URL
  await page.goto(loginPageURL);

  // Step 2: Enter the registered email address
  const email = 'dimansha.nethmini@gmail.com'; //  Email used for registration
  await page.fill('#email-input', email);  //  Selector for email input

  // Step 3: Click "Continue" or Next to proceed to the verification step
  await page.click('#sign-in-btn');  //  Button text/selector

  // Step 4: Wait for the verification code to be sent to the email and check inbox manually 
  //  Actual code from the email inbox 
  const verificationCode = '136714';  //  Actual verification code received

  // Step 5: Enter the verification code on the login page
  await page.fill('#otp-input-0', verificationCode);  //  Selector for verification code input

  // Step 6: Create a unique password (with at least 8 characters or as suggested)
  const password = 'Neth98#10#01*@';  //  Password created
  await page.fill('#pass-input', password);  //  Selector for password input

  // Step 7: Click the "Continue" button to submit the form
  await page.click('#password-sign-in-btn');  //  Button text/selector

  // Step 8: Verify that the user is redirected to the home page
  await expect(page).toHaveURL('https://onlinelibrary.wiley.com/');  // Home page URL after login
});
