export const payPeriodPlannerEvidence = [
  {
    value: "Unit + integration",
    label: "Product behavior",
    summaryLabel: "product behavior coverage",
    detail: "Calculations, editing, validation, and failure states",
  },
  {
    value: "Live browser",
    label: "Cross-layer workflows",
    summaryLabel: "cross-layer workflow coverage",
    detail: "Authentication, isolation, persistence, and conflicts",
  },
  {
    value: "PostgreSQL",
    label: "Relational runtime",
    summaryLabel: "relational runtime coverage",
    detail: "Flyway, workspace ownership, writes, and audit history",
  },
  {
    value: "Axe + keyboard",
    label: "Accessible workflows",
    summaryLabel: "accessible workflow coverage",
    detail: "Account forms, financial sections, dialogs, and focus",
  },
  {
    value: "320-1024px",
    label: "Responsive layouts",
    summaryLabel: "responsive layout coverage",
    detail: "Containment, table reflow, controls, and navigation",
  },
  {
    value: "CI + scans",
    label: "Security gates",
    summaryLabel: "security gate coverage",
    detail: "CodeQL, dependency review, Snyk, and npm audits",
  },
] as const;

export const payPeriodPlannerEvidenceHighlights = payPeriodPlannerEvidence.slice(
  0,
  3,
);
