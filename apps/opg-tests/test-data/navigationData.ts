import { MainMenu, MAIN_MENU } from './navigation.constants';

export interface MenuDestination {
  readonly label: MainMenu;
  readonly expectedPath: string;
}

export const MENU_DESTINATIONS: readonly MenuDestination[] = [
  { label: MAIN_MENU.About, expectedPath: '/about-us/' },
  { label: MAIN_MENU.PowerGeneration, expectedPath: '/power-generation/' },
  { label: MAIN_MENU.ProjectsAndServices, expectedPath: '/projects-services/' },
  { label: MAIN_MENU.Communities, expectedPath: '/communities/' },
  { label: MAIN_MENU.NewsAndResources, expectedPath: '/news-resources/' },
] as const;
