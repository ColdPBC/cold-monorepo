import { createElement } from 'react';
import { act, create, ReactTestRenderer } from 'react-test-renderer';

const mounted: ReactTestRenderer[] = [];

// The hook has no DOM dependency; exercise its React lifecycle with the pinned renderer.
export function renderHook<T>(callback: () => T) {
  const result = { current: undefined as T };
  function Harness() {
    result.current = callback();
    return null;
  }
  act(() => {
    mounted.push(create(createElement(Harness)));
  });
  return { result };
}

export function cleanupHooks() {
  act(() => {
    for (const renderer of mounted.splice(0)) renderer.unmount();
  });
}
