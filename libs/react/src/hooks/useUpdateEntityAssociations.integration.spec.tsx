import React from 'react';
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import axios, { AxiosError } from 'axios';
import { EntityLevel } from '../enums/entities';
import { ToastMessage } from '../interfaces/toastMessage';
import { EditEntityAssociationsModal } from '../components/molecules/editEntityAssociationsModal/editEntityAssociationsModal';
import { EditMaterialDetails } from '../components/molecules/editMaterialDetails/editMaterialDetails';

const fixtures = vi.hoisted(() => ({ toast: vi.fn(), log: vi.fn(), graph: vi.fn(), rows: [] as { id: string; name: string }[] }));
vi.mock('./useGraphqlMutation', () => ({ useGraphQLMutation: () => ({ mutateGraphQL: fixtures.graph }) }));
vi.mock('@coldpbc/hooks', async () => ({
  useUpdateEntityAssociations: (await import('./useUpdateEntityAssociations')).useUpdateEntityAssociations,
  useGraphQLMutation: () => ({ mutateGraphQL: fixtures.graph }),
  useAuth0Wrapper: () => ({ orgId: 'org-1' }),
  useAddToastMessage: () => ({ addToastMessage: fixtures.toast }),
  useColdContext: () => ({ logBrowser: fixtures.log }),
  useEntityData: () => fixtures.rows,
  useGraphQLSWR: () => ({ data: { data: { materialClassifications: [], organizationFacilities: [{ id: 'supplier-1', name: 'Supplier' }] } }, isLoading: false }),
}));
vi.mock('@coldpbc/interfaces', async () => ({ ToastMessage: (await import('../interfaces/toastMessage')).ToastMessage }));
vi.mock('@coldpbc/themes', () => ({ flowbiteThemeOverride: { modal: {} }, HexColors: { tc: { disabled: '#000' } } }));
vi.mock('@coldpbc/lib', () => ({ GRID_CHECKBOX_COL_DEF: { field: '__check__' } }));
// Replace visual widgets, while keeping the real caller, hook, fetcher and Axios request pipeline.
vi.mock('@mui/material', () => ({ Checkbox: ({ checked, onClick }) => <input type="checkbox" checked={checked} onClick={onClick} /> }));
vi.mock('flowbite-react', () => ({ Modal: ({ show, onClose, children }) => show ? <section role="dialog"><button onClick={onClose}>Close</button>{children}</section> : null }));
vi.mock('@coldpbc/components', () => ({
  BaseButton: ({ label, onClick, disabled, loading }) => <button onClick={onClick} disabled={disabled} aria-busy={loading}>{label}</button>,
  Card: ({ children, ctas = [] }) => <div>{children}{ctas.map(cta => <button key={cta.text} onClick={cta.action} disabled={cta.disabled} aria-busy={cta.loading}>{cta.text}</button>)}</div>,
  MuiDataGrid: ({ rows, columns }) => <div>{rows.map(row => <label key={row.id}>{row.name}{columns[0].renderCell({ row })}</label>)}</div>,
  DropdownInputForEntityEdit: ({ fieldName, entityState, setEntityState }) => <select name={fieldName} value={entityState[fieldName]?.id ?? ''} onChange={event => setEntityState({ ...entityState, [fieldName]: event.target.value ? { id: event.target.value } : null })} />,
  TextInputForEntityEdit: () => null,
  ColdIcon: () => null,
  ErrorFallback: () => <div>Unexpected render error</div>,
  Popover: ({ children }) => <div>{children}</div>,
  Spinner: () => null,
}));
vi.mock('../components/atoms/numericInputWithUnitOfMeasure/numericInputWithUnitOfMeasure', () => ({ NumericInputWithUnitOfMeasure: () => null }));

const originalAdapter = axios.defaults.adapter;
const adapter = vi.fn();
let view: ReactTestRenderer | undefined;
function root() {
  if (!view) throw new Error('The test view has not been mounted');
  return view.root;
}
const buttons = (label: string) => root().findAllByType('button').filter(button => button.props.children === label);
const savedResponse = async config => ({ data: { id: 'saved' }, status: 200, statusText: 'OK', headers: {}, config });

beforeEach(() => {
  axios.defaults.adapter = adapter;
  adapter.mockReset();
  fixtures.graph.mockReset().mockResolvedValue({ data: { id: 'saved' } });
});
afterEach(() => {
  axios.defaults.adapter = originalAdapter;
  act(() => view?.unmount());
  view = undefined;
});

function openAssociationEditor(level: EntityLevel) {
  fixtures.rows = [{ id: 'entity-1', name: 'Entity' }];
  const refresh = vi.fn();
  act(() => {
    view = create(<EditEntityAssociationsModal buttonText="Edit associations" saveButtonText="Save" title="Associations" refresh={refresh} entityLevelToAdd={level} entityLevelToBeAddedTo={EntityLevel.SUPPLIER} idsSelected={['entity-1']} entityToBeAddedId="supplier-1" />);
  });
  act(() => buttons('Edit associations')[0].props.onClick());
  act(() => root().findByType('input').props.onClick());
  return refresh;
}

describe('association modal with the real supplier mutation', () => {
  it.each([EntityLevel.PRODUCT, EntityLevel.MATERIAL])('keeps a failed %s removal open and permits a successful retry', async level => {
    const failure = new AxiosError('Synthetic request failure');
    adapter.mockRejectedValueOnce(failure).mockImplementationOnce(savedResponse);
    const refresh = openAssociationEditor(level);

    await act(async () => buttons('Edit associations')[1].props.onClick());

    expect(fixtures.toast).toHaveBeenCalledWith(expect.objectContaining({ type: ToastMessage.FAILURE }));
    expect(fixtures.toast).not.toHaveBeenCalledWith(expect.objectContaining({ type: ToastMessage.SUCCESS }));
    expect(refresh).not.toHaveBeenCalled();
    expect(root().findAllByProps({ role: 'dialog' })).toHaveLength(1);
    expect(buttons('Edit associations')[1].props.disabled).toBe(false);
    expect(buttons('Edit associations')[1].props['aria-busy']).toBe(false);
    expect(fixtures.log).toHaveBeenCalledWith(expect.any(String), 'error', expect.any(Object), failure);

    await act(async () => buttons('Edit associations')[1].props.onClick());

    expect(adapter).toHaveBeenCalledTimes(2);
    expect(refresh).toHaveBeenCalledTimes(1);
    expect(fixtures.toast).toHaveBeenCalledWith(expect.objectContaining({ type: ToastMessage.SUCCESS }));
    expect(root().findAllByProps({ role: 'dialog' })).toHaveLength(0);
  });

  it('disables submission while removal is pending and closes after confirmed success', async () => {
    let complete!: () => void;
    adapter.mockImplementation(config => new Promise(resolve => { complete = () => resolve({ data: {}, status: 200, statusText: 'OK', headers: {}, config }); }));
    const refresh = openAssociationEditor(EntityLevel.PRODUCT);
    let pending!: Promise<void>;
    act(() => { pending = buttons('Edit associations')[1].props.onClick(); });
    await act(async () => { await Promise.resolve(); });
    expect(buttons('Edit associations')[1].props.disabled).toBe(true);
    expect(buttons('Edit associations')[1].props['aria-busy']).toBe(true);
    expect(refresh).not.toHaveBeenCalled();
    expect(fixtures.toast).not.toHaveBeenCalled();
    await act(async () => { complete(); await pending; });
    expect(refresh).toHaveBeenCalledTimes(1);
    expect(root().findAllByProps({ role: 'dialog' })).toHaveLength(0);
  });

  it('cancels without a request and restores the original selection when reopened', () => {
    openAssociationEditor(EntityLevel.MATERIAL);
    act(() => buttons('Cancel')[0].props.onClick());
    expect(root().findAllByProps({ role: 'dialog' })).toHaveLength(0);
    act(() => buttons('Edit associations')[0].props.onClick());
    expect(root().findByType('input').props.checked).toBe(true);
    expect(buttons('Edit associations')[1].props.disabled).toBe(true);
    expect(adapter).not.toHaveBeenCalled();
  });
});

it('keeps material details open on supplier-removal failure and completes a retry', async () => {
  adapter.mockRejectedValueOnce(new AxiosError('Synthetic removal failure')).mockImplementationOnce(savedResponse);
  const onClose = vi.fn();
  const refreshMaterial = vi.fn().mockResolvedValue(undefined);
  fixtures.rows = [];
  const material = { id: 'material-1', name: 'Material', organizationFacility: { id: 'supplier-1', name: 'Supplier' } };
  act(() => { view = create(<EditMaterialDetails material={material as React.ComponentProps<typeof EditMaterialDetails>['material']} onClose={onClose} refreshMaterial={refreshMaterial} />); });
  act(() => root().findByProps({ name: 'organizationFacility' }).props.onChange({ target: { value: '' } }));
  await act(async () => buttons('Save')[0].props.onClick());

  expect(fixtures.toast).toHaveBeenCalledWith({ message: 'Error updating material', type: ToastMessage.FAILURE });
  expect(fixtures.toast).not.toHaveBeenCalledWith(expect.objectContaining({ type: ToastMessage.SUCCESS }));
  expect(refreshMaterial).not.toHaveBeenCalled();
  expect(onClose).not.toHaveBeenCalled();
  expect(buttons('Save')[0].props['aria-busy']).toBe(false);
  expect(buttons('Save')[0].props.disabled).toBe(false);

  await act(async () => buttons('Save')[0].props.onClick());

  expect(adapter).toHaveBeenCalledTimes(2);
  expect(refreshMaterial).toHaveBeenCalledTimes(1);
  expect(onClose).toHaveBeenCalledTimes(1);
  expect(fixtures.toast).toHaveBeenCalledWith({ message: 'Material updated successfully', type: ToastMessage.SUCCESS });
});
