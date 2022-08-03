import { test, expect } from '@playwright/test';
//import {Page,chromium} from 'playwright';
//import './server';




test.only('test', async ({page}) => {
  // Go to https://www.wikipedia.org/
  await page.goto('https://www.wikipedia.org/');
  // Click strong:has-text("English")
  await page.locator('strong:has-text("English")').click();
  await expect(page).toHaveURL('https://en.wikipedia.org/wiki/Main_Page');
});

