import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanupHooks, renderHook } from '../../test-utils/renderHook';
import axios, { AxiosError } from 'axios';
import { EntityLevel } from '../enums/entities';
import { axiosFetcher } from '../fetchers/axiosFetcher';
import { useUpdateEntityAssociations } from './useUpdateEntityAssociations';

const graph = vi.hoisted(() => ({
  UPDATE_PRODUCT: vi.fn(),
  UPDATE_MATERIAL: vi.fn(),
  CREATE_PRODUCT_MATERIAL: vi.fn(),
  DELETE_PRODUCT_MATERIALS: vi.fn(),
}));
vi.mock('./useGraphqlMutation', () => ({
  useGraphQLMutation: (query: keyof typeof graph) => ({ mutateGraphQL: graph[query] }),
}));

const originalAdapter = axios.defaults.adapter;
const adapter = vi.fn();
const removalCases = [
  { level: EntityLevel.PRODUCT, id: 'product-1', path: 'products', payload: { id: 'product-1', supplier_id: null } },
  { level: EntityLevel.MATERIAL, id: 'material-1', path: 'materials', payload: { id: 'material-1', organization_facility_id: null } },
];

beforeEach(() => {
  axios.defaults.adapter = adapter;
  adapter.mockReset();
  for (const mutation of Object.values(graph)) mutation.mockReset().mockResolvedValue({ data: { updated: true } });
});
afterEach(() => {
  axios.defaults.adapter = originalAdapter;
  cleanupHooks();
});

for (const removal of removalCases) {
  describe(`${removal.level} supplier removal`, () => {
    it.each([
      ['AxiosError', () => new AxiosError('Request failed', 'ERR_BAD_RESPONSE')],
      ['Error', () => new Error('Network failed')],
      ['cross-realm Axios error shape', () => ({ isAxiosError: true, message: 'Request failed' })],
    ])('rejects the original %s so callers enter their failure path', async (_name, makeError) => {
      const failure = makeError();
      adapter.mockRejectedValue(failure);
      const { result } = renderHook(() => useUpdateEntityAssociations());
      await expect(result.current.callMutateFunction(removal.level, EntityLevel.SUPPLIER, removal.id, 'supplier-1', 'org-1', 'delete')).rejects.toBe(failure);
      expect(adapter).toHaveBeenCalledTimes(1);
    });

    it.each([{ id: 'updated' }, undefined, { error: 'a legitimate payload field' }])('preserves successful response data and the PATCH contract (%s)', async payload => {
      adapter.mockImplementation(async config => ({ data: payload, status: 200, statusText: 'OK', headers: {}, config }));
      const { result } = renderHook(() => useUpdateEntityAssociations());
      await expect(result.current.callMutateFunction(removal.level, EntityLevel.SUPPLIER, removal.id, 'supplier-1', 'org-1', 'delete')).resolves.toBe(payload);
      expect(adapter).toHaveBeenCalledTimes(1);
      const config = adapter.mock.calls[0][0];
      expect(config.url).toBe(`/organizations/org-1/${removal.path}/${removal.id}`);
      expect(config.method).toBe('patch');
      expect(JSON.parse(config.data)).toEqual(removal.payload);
      expect(config.headers['Content-Type']).toBe('application/json');
      for (const mutation of Object.values(graph)) expect(mutation).not.toHaveBeenCalled();
    });
  });
}

it('preserves axiosFetcher’s resolved-error contract for its other consumers', async () => {
  const failure = new AxiosError('Request failed');
  adapter.mockRejectedValue(failure);
  await expect(axiosFetcher(['/test', 'PATCH', { id: 'test' }])).resolves.toBe(failure);
});

it.each([
  [EntityLevel.MATERIAL, EntityLevel.PRODUCT, 'add', 'CREATE_PRODUCT_MATERIAL', { input: { material: { id: 'entity-1' }, product: { id: 'parent-1' }, organization: { id: 'org-1' } } }],
  [EntityLevel.MATERIAL, EntityLevel.PRODUCT, 'delete', 'DELETE_PRODUCT_MATERIALS', { filter: { material: { id: 'entity-1' }, product: { id: 'parent-1' }, organization: { id: 'org-1' } } }],
  [EntityLevel.MATERIAL, EntityLevel.SUPPLIER, 'add', 'UPDATE_MATERIAL', { input: { id: 'entity-1', organizationFacility: { id: 'parent-1' }, organization: { id: 'org-1' } } }],
  [EntityLevel.PRODUCT, EntityLevel.SUPPLIER, 'add', 'UPDATE_PRODUCT', { input: { id: 'entity-1', organizationFacility: { id: 'parent-1' } } }],
] as const)('preserves GraphQL %s → %s %s', async (child, parent, action, query, variables) => {
  const response = { data: { id: 'association-1' } };
  graph[query].mockResolvedValueOnce(response);
  const { result } = renderHook(() => useUpdateEntityAssociations());
  await expect(result.current.callMutateFunction(child, parent, 'entity-1', 'parent-1', 'org-1', action)).resolves.toBe(response);
  expect(graph[query]).toHaveBeenCalledWith(variables);
  expect(adapter).not.toHaveBeenCalled();
});

it('continues to reject unsupported association types before a request', () => {
  const { result } = renderHook(() => useUpdateEntityAssociations());
  expect(() => result.current.callMutateFunction(EntityLevel.SUPPLIER, EntityLevel.MATERIAL, 'child', 'parent', 'org-1', 'delete')).toThrow('Unsupported entity types or action');
  expect(adapter).not.toHaveBeenCalled();
});

it('preserves mixed success/error results for the shared multi-URL fetcher', async () => {
  const failure = new AxiosError('Second request failed');
  const payload = { id: 'first' };
  adapter.mockImplementationOnce(async config => ({ data: payload, status: 200, statusText: 'OK', headers: {}, config })).mockRejectedValueOnce(failure);
  await expect(axiosFetcher([['/first', '/second'], 'GET'])).resolves.toEqual([payload, failure]);
});

it('preserves GraphQL rejection identity', async () => {
  const failure = new Error('GraphQL mutation failed');
  graph.UPDATE_MATERIAL.mockRejectedValueOnce(failure);
  const { result } = renderHook(() => useUpdateEntityAssociations());
  await expect(result.current.callMutateFunction(EntityLevel.MATERIAL, EntityLevel.SUPPLIER, 'material-1', 'supplier-1', 'org-1', 'add')).rejects.toBe(failure);
  expect(adapter).not.toHaveBeenCalled();
});
