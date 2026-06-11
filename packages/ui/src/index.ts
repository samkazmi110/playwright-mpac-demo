export { BasePage } from './base/index';
export { BaseComponent } from './base/index';
export { BaseModal } from './base/index';
export { BaseTable } from './base/index';
export { BaseForm } from './base/index';
export {
  runAccessibilityScan,
  assertNoCriticalViolations,
  buildAccessibilityReport,
  attachAccessibilityReport,
  getElementDebugDetails,
} from './accessibility/index';
export type {
  AxeNode,
  AxeViolation,
  ElementDebugDetails,
  AccessibilityScanOptions,
} from './accessibility/index';
