import React from 'react';
import { act, create, ReactTestRenderer } from 'react-test-renderer';

// These tests exercise provider effects and telemetry, not DOM rendering.
// Keeping them in Node avoids loading unrelated native canvas dependencies.
const mounted = new Set<ReactTestRenderer>();

export function render(element: React.ReactElement) {
  let renderer: ReactTestRenderer;
  act(() => { renderer = create(element); });
  mounted.add(renderer!);
  return renderer!;
}

export function cleanup() {
  act(() => {
    for (const renderer of mounted) renderer.unmount();
  });
  mounted.clear();
}

export async function flushEffects() {
  await act(async () => { await Promise.resolve(); });
}

export { act };
