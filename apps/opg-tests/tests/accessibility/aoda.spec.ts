import { test, expect } from '@playwright/test';
import {
  runAccessibilityScan,
  assertNoCriticalViolations,
  attachAccessibilityReport,
  AxeViolation,
} from '@opg/pw-ui';

test.describe('AODA Accessibility @accessibility', () => {
  test('homepage should have no serious or critical axe violations', async ({ page }, testInfo) => {
    await page.goto('/');

    const { violations } = await runAccessibilityScan(page, {
      tags: ['wcag2a', 'wcag2aa'],
    });

    const criticalViolations = assertNoCriticalViolations(violations);

    if (criticalViolations.length > 0) {
      await attachAccessibilityReport(testInfo, page, criticalViolations);
    }

    expect(
      criticalViolations,
      `Found ${criticalViolations.length} serious/critical accessibility violations`
    ).toEqual([]);
  });
});
