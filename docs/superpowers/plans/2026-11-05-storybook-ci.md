# Storybook UI CI Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement each task and verify the final branch.

**Goal:** A genuine Storybook UI required check for every pull request.
**Architecture:** Build locally, serve on loopback, execute the existing Storybook Chromium suite with offline browser configuration, and validate complete Jest results.
**Tech Stack:** GitHub Actions, pinned Yarn 4.4.1, Storybook 8/test-runner, Node test runner, Python unittest.
**Spec:** ../specs/2026-11-05-storybook-ci-design.md

## Global constraints
- Stable check name: `storybook-ui-tests`.
- No PR path/base-branch filters or silent skip/pass-on-empty behavior.
- No deployment, external browser traffic, or service credentials.
- Preserve immutable installs and test before implementation.

## Review focus
Check missing/failed/skipped result JSON, pull requests outside main, service-worker egress, native module installation without lifecycle scripts, and unmocked existing stories.

## Task 1: Protect CI entry and result interpretation
- [x] Add and observe failing tests for absent all-PR workflow and result verifier.
- [ ] Implement the stable workflow and fail-closed result verifier.
- [ ] Run all CI contract and Node result tests.

## Task 2: Isolate and execute Storybook
- [ ] Observe a local-fixture browser isolation failure in CI (local Chromium is sandbox-blocked).
- [ ] Configure the test runner with an offline Chromium proxy; verify direct and service-worker egress against disposable loopback fixtures.
- [ ] Build all stories, run real render/play tests in CI, and fix or report blockers without masking failures.
- [ ] Request review, push, open a draft PR linked to #930, and verify exact-head checks.
