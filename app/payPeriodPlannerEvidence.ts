export const payPeriodPlannerEvidenceBaseline = "July 15, 2026";

export const payPeriodPlannerEvidence = [
  {
    value: 119,
    label: "Frontend tests",
    summaryLabel: "frontend tests",
    detail: "20 files",
  },
  {
    value: 63,
    label: "Backend tests",
    summaryLabel: "backend tests",
    detail: "12 classes",
  },
  {
    value: 28,
    label: "PostgreSQL tests",
    summaryLabel: "PostgreSQL integration tests",
    detail: "8 classes",
  },
  {
    value: 6,
    label: "Browser scenarios",
    summaryLabel: "browser scenarios",
    detail: "3 specifications",
  },
  {
    value: 2,
    label: "Axe scenarios",
    summaryLabel: "axe scenarios",
    detail: "WCAG A/AA rules",
  },
  {
    value: 4,
    label: "Responsive widths",
    summaryLabel: "responsive widths",
    detail: "320px through 1024px",
  },
] as const;

export const payPeriodPlannerEvidenceHighlights = payPeriodPlannerEvidence.slice(
  0,
  3,
);
