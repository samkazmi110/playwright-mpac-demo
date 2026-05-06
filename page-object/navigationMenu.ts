import { YourAssessmentMenu } from "./navigation/submenu/yourAssessmentMenu";
import {  MainMenu } from '../enums/navigationMenu/mainMenu';
import { Page, Locator } from '@playwright/test';




export class NavigationMenu {
  readonly page: Page;
   readonly navMenu: Locator;
  readonly yourAssessment: YourAssessmentMenu;

  constructor(page: Page) {
    this.page = page;
    this.navMenu = page.getByRole('menu', { name: 'Menu' });
    this.yourAssessment = new YourAssessmentMenu(this);
  }

  
  /**
   * Get a main menu item by its visible text.
   */
  getMenuItem(name: string): Locator {
    return this.navMenu.getByRole('menuitem', { name });
  }

  /**
   * Click a main menu item by its visible text.
   */
  async clickMenuItem(name: string) {
    await this.getMenuItem(name).click();
  }

  /**
   * Hover a main menu item by its visible text.
   */
  async hoverMenuItem(name: string) {
    await this.getMenuItem(name).hover();
  }

  /**
   * Get the submenu locator for a main menu item.
   * Assumes submenu is a child [role="menu"] of the menuitem.
   */
  getSubMenu(mainMenuItem: string): Locator {
    return this.getMenuItem(mainMenuItem).locator('[role="menu"]');
  }

  /**
   * Click a submenu item by visible text.
   * @param mainMenuItem The main menu item text
   * @param subMenuItem The submenu item text
   */
  async clickSubMenuItem(mainMenuItem: string, subMenuItem: string) {
    const mainItem = this.getMenuItem(mainMenuItem);
    await mainItem.hover();
    const subMenu = mainItem.locator('[role="menu"]');
    await subMenu.getByRole('menuitem', { name: subMenuItem }).click();
  }

  /**
   * Hover a submenu item by visible text.
   */
  async hoverSubMenuItem(mainMenuItem: string, subMenuItem: string) {
    const mainItem = this.getMenuItem(mainMenuItem);
    await mainItem.hover();
    const subMenu = mainItem.locator('[role="menu"]');
    await subMenu.getByRole('menuitem', { name: subMenuItem }).hover();
  }
}
