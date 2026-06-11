export type { AxeNode, AxeViolation, ElementDebugDetails, AccessibilityScanOptions } from './a11y.types';
export {
  runAccessibilityScan,
  assertNoCriticalViolations,
  getElementDebugDetails,
  buildAccessibilityReport,
  attachAccessibilityReport,
} from './accessibilityHelper';
