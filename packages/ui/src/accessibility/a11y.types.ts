export type AxeNode = {
  target: string[];
  html?: string;
  failureSummary?: string;
};

export type AxeViolation = {
  id: string;
  impact: string | null;
  help: string;
  helpUrl: string;
  description?: string;
  nodes: AxeNode[];
};

export type ElementDebugDetails = {
  selector: string;
  count: number;
  sampleElements: Array<{
    tag: string;
    id: string | null;
    className: string | null;
    role: string | null;
    ariaLabel: string | null;
    text: string;
    html: string;
  }>;
};

export interface AccessibilityScanOptions {
  tags?: string[];
  exclude?: string[];
  include?: string[];
}
