# Storybook UI CI gate

Provide a stable `storybook-ui-tests` check on every PR and merge group. Run all existing Storybook render/play stories against a local static build with mock data, no deployments and no secrets. Fail on missing, empty, incomplete, skipped, or failed results.

Reuse the locked Storybook test-runner rather than treating branch-specific Vitest tests or Chromatic upload as Storybook validation. Keep immutable dependency installation. Chromium uses an unreachable proxy for everything except explicit localhost addresses, including service-worker requests; local fixtures prove the boundary before any application story runs.

The initial workflow may expose pre-existing story failures. Do not skip or mask those failures to make a required check green. Branch-protection activation and merging are separate operations.
