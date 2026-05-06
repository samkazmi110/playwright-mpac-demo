import { test, expect } from '@playwright/test';
import { PageManager } from '../managers/pageManager';
test.describe('Your Assessment Submenu Navigation', () => {
	test('should visit each Your Assessment submenu page', async ({ page }) => {
		const pageManager = new PageManager(page);
		await page.goto('https://mpac.ca'); 

		// Each submenu: click and assert the page contains the submenu title
		await pageManager.navigationMenu.yourAssessment.propertyAssessmentAndTaxes();
		await expect(pageManager.page).toHaveTitle(/Property Assessment and Property Taxes*/i, { timeout: 5000 });

		await pageManager.navigationMenu.yourAssessment.noticesAndNotifications();
		await expect(pageManager.page).toHaveTitle(/Notices and Notifications*/i, { timeout: 5000 });

		await pageManager.navigationMenu.yourAssessment.readingAssessmentNotice();
		await expect(pageManager.page).toHaveTitle(/Reading your property assessment notice*/i, { timeout: 5000 });

		await pageManager.navigationMenu.yourAssessment.homeownersHub();
		await expect(pageManager.page).toHaveTitle(/Homeowners’ Hub*/i, { timeout: 5000 });

		await pageManager.navigationMenu.yourAssessment.howSalesAffectAssessment();
		await expect(pageManager.page).toHaveTitle(/How sales affect your property assessment*/i, { timeout: 5000 });

		await pageManager.navigationMenu.yourAssessment.propertyInspections();
		await expect(pageManager.page).toHaveTitle(/Property Inspections*/i, { timeout: 5000 });

		await pageManager.navigationMenu.yourAssessment.threeApproachesToValue();
		await expect(pageManager.page).toHaveTitle(/Three approaches to value*/i, { timeout: 5000 });

		await pageManager.navigationMenu.yourAssessment.fourYearAssessmentCycle();
		await expect(pageManager.page).toHaveTitle(/The Assessment Cycle*/i, { timeout: 5000 });

		await pageManager.navigationMenu.yourAssessment.comparePropertyValues();
		await expect(pageManager.page).toHaveTitle(/Compare Property Values*/i, { timeout: 5000 });

		await pageManager.navigationMenu.yourAssessment.disclosure2016Update();
		await expect(pageManager.page).toHaveTitle(/Information Disclosure for the 2016 Update*/i, { timeout: 5000 });
	});
});
