import {  MainMenu } from '../../../enums/navigationMenu/mainMenu'
import { NavigationMenu } from '../../navigationMenu';
import { YourAssessmentSubMenu } from '../../../enums/navigationMenu/yourAssessmentSubMenu';

export class YourAssessmentMenu {
  constructor(private navMenu: NavigationMenu) {}

  private async clickSubMenu(subMenu: YourAssessmentSubMenu) {
    //make sure page is loaded
    await this.navMenu.page.waitForLoadState('domcontentloaded');
    await this.navMenu.getMenuItem(MainMenu.YourAssessment).hover();
    await this.navMenu.page.getByRole('menuitem', { name: subMenu }).waitFor({ state: 'visible' });
    await this.navMenu.page.getByRole('menuitem', { name: subMenu }).click();
    await this.navMenu.page.waitForLoadState('domcontentloaded');

  }

  async propertyAssessmentAndTaxes() {
    await this.clickSubMenu(YourAssessmentSubMenu.PropertyAssessmentAndTaxes);
  }
  async noticesAndNotifications() {
    await this.clickSubMenu(YourAssessmentSubMenu.NoticesAndNotifications);
  }
  async readingAssessmentNotice() {
    await this.clickSubMenu(YourAssessmentSubMenu.ReadingAssessmentNotice);
  }
  async homeownersHub() {
    await this.clickSubMenu(YourAssessmentSubMenu.HomeownersHub);
  }
  async howSalesAffectAssessment() {
    await this.clickSubMenu(YourAssessmentSubMenu.HowSalesAffectAssessment);
  }
  async propertyInspections() {
    await this.clickSubMenu(YourAssessmentSubMenu.PropertyInspections);
  }
  async threeApproachesToValue() {
    await this.clickSubMenu(YourAssessmentSubMenu.ThreeApproachesToValue);
  }
  async fourYearAssessmentCycle() {
    await this.clickSubMenu(YourAssessmentSubMenu.FourYearAssessmentCycle);
  }
  async comparePropertyValues() {
    await this.clickSubMenu(YourAssessmentSubMenu.ComparePropertyValues);
  }
  async disclosure2016Update() {
    await this.clickSubMenu(YourAssessmentSubMenu.Disclosure2016Update);
  }
}