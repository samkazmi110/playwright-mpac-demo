//import all pages here and use it in tests
import { test, expect ,Page} from '@playwright/test';
import { HomePage } from '../page-object/homePage';
import { YourAssessment } from '../page-object/yourAssessment';
import { NavigationMenu } from '../page-object/navigationMenu';

export class PageManager {
    readonly page: Page
    readonly homePage: HomePage
    readonly yourAssessment: YourAssessment
    readonly navigationMenu: NavigationMenu

    constructor(page: Page){
        this.page = page
        this.homePage = new HomePage(page)
        this.yourAssessment = new YourAssessment(page)
        this.navigationMenu = new NavigationMenu(page)
    }
}