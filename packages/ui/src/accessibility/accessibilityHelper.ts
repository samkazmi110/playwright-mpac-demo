import { Page, TestInfo } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { AccessibilityScanOptions, AxeViolation, ElementDebugDetails } from './a11y.types';

export async function runAccessibilityScan(
  page: Page,
  options: AccessibilityScanOptions = {}
): Promise<{ violations: AxeViolation[] }> {
  const builder = new AxeBuilder({ page });

  if (options.tags?.length) {
    builder.withTags(options.tags);
  }
  if (options.exclude?.length) {
    for (const selector of options.exclude) {
      builder.exclude(selector);
    }
  }
  if (options.include?.length) {
    for (const selector of options.include) {
      builder.include(selector);
    }
  }

  const results = await builder.analyze();
  return { violations: results.violations as AxeViolation[] };
}

export function assertNoCriticalViolations(violations: AxeViolation[]): AxeViolation[] {
  return violations.filter(
    (v) => v.impact === 'serious' || v.impact === 'critical'
  );
}

export async function getElementDebugDetails(
  page: Page,
  selector: string
): Promise<ElementDebugDetails> {
  const locator = page.locator(selector);
  const count = await locator.count();
  const maxSamples = Math.min(count, 2);
  const sampleElements: ElementDebugDetails['sampleElements'] = [];

  for (let i = 0; i < maxSamples; i++) {
    const sample = await locator.nth(i).evaluate((element) => ({
      tag: element.tagName.toLowerCase(),
      id: element.id || null,
      className: element.className || null,
      role: element.getAttribute('role'),
      ariaLabel: element.getAttribute('aria-label'),
      text: (element.textContent ?? '').trim().replace(/\s+/g, ' ').slice(0, 160),
      html: element.outerHTML.replace(/\s+/g, ' ').slice(0, 320),
    }));
    sampleElements.push(sample);
  }

  return { selector, count, sampleElements };
}

export async function buildAccessibilityReport(
  page: Page,
  violations: AxeViolation[]
): Promise<string> {
  const sections: string[] = [];

  for (const violation of violations) {
    const nodeDetails = await Promise.all(
      violation.nodes.slice(0, 3).map(async (node) => {
        const selector = node.target.join(' ');
        try {
          const debug = await getElementDebugDetails(page, selector);
          return { selector, failureSummary: node.failureSummary ?? 'N/A', htmlFromAxe: node.html ?? 'N/A', debug };
        } catch {
          return { selector, failureSummary: node.failureSummary ?? 'N/A', htmlFromAxe: node.html ?? 'N/A', debug: { selector, count: 0, sampleElements: [] } };
        }
      })
    );

    const nodeSection = nodeDetails
      .map((detail, index) => {
        const sampleLines = detail.debug.sampleElements.length
          ? detail.debug.sampleElements
              .map((s, si) => `      sample ${si + 1}: tag=${s.tag}, id=${s.id ?? 'none'}, role=${s.role ?? 'none'}, aria-label=${s.ariaLabel ?? 'none'}, text="${s.text}"`)
              .join('\n')
          : '      no matching live DOM elements found';

        return [`  node ${index + 1}:`, `    selector: ${detail.selector}`, `    matches: ${detail.debug.count}`, `    failure: ${detail.failureSummary.replace(/\s+/g, ' ').trim()}`, sampleLines].join('\n');
      })
      .join('\n');

    sections.push([`[${violation.impact ?? 'unknown'}] ${violation.id}`, `help: ${violation.help}`, `url: ${violation.helpUrl}`, nodeSection].join('\n'));
  }

  return sections.join('\n\n');
}

export async function attachAccessibilityReport(
  testInfo: TestInfo,
  page: Page,
  violations: AxeViolation[]
): Promise<void> {
  if (violations.length === 0) return;

  const report = await buildAccessibilityReport(page, violations);

  await testInfo.attach('a11y-violations-readable.txt', {
    body: Buffer.from(report, 'utf8'),
    contentType: 'text/plain',
  });

  await testInfo.attach('a11y-violations-raw.json', {
    body: Buffer.from(JSON.stringify(violations, null, 2), 'utf8'),
    contentType: 'application/json',
  });
}
