export const MAIN_MENU = {
  About: 'About',
  PowerGeneration: 'Power generation',
  ProjectsAndServices: 'Projects & services',
  Communities: 'Communities',
  NewsAndResources: 'News & resources',
} as const;

export type MainMenu = (typeof MAIN_MENU)[keyof typeof MAIN_MENU];

export const OPG_UTILITY_LINKS = {
  Careers: 'Careers',
  Investors: 'Investors',
  Reports: 'Reports',
} as const;

export type OpgUtilityLink = (typeof OPG_UTILITY_LINKS)[keyof typeof OPG_UTILITY_LINKS];
