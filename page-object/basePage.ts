import { Page } from "@playwright/test";
import { NavigationMenu } from "./navigationMenu";

export class BasePage {

    page: Page
    navigationMenu: NavigationMenu

    constructor(page: Page){
        this.page = page
        this.navigationMenu = new NavigationMenu(page);
    }

}