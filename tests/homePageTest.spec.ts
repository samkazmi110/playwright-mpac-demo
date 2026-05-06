import {test, Page,expect} from '@playwright/test'

test.describe('Home Page Tests', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('https://mpac.ca')
        await expect(page).toHaveTitle(/Welcome to MPAC | MPAC/i)
    })

    test('Verify Home Page Elements', async ({page}) => {
        const logo = page.locator('img[alt="MPAC Logo"]')
        await expect(logo).toBeVisible()
    })

    
        
})