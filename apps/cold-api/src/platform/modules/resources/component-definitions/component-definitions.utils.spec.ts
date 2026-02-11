import { filterItemsByRole } from './component-definitions.utils';

describe('component-definitions.utils', () => {
  it('returns input when items is falsy', () => {
    expect(filterItemsByRole(null as any, ['admin'])).toBeNull();
  });

  it('keeps items without roles', () => {
    const items = [{ id: 'a' }, { id: 'b', roles: undefined }];

    const result = filterItemsByRole(items as any, ['admin']);

    expect(result).toEqual(items);
  });

  it('keeps items with matching roles and prunes nested children recursively', () => {
    const items = [
      {
        id: 'parent',
        roles: ['admin'],
        items: [
          { id: 'child-keep', roles: ['admin'] },
          { id: 'child-drop', roles: ['viewer'] },
        ],
      },
    ];

    const result = filterItemsByRole(items as any, ['admin']);

    expect(result).toHaveLength(1);
    expect(result[0].items).toEqual([{ id: 'child-keep', roles: ['admin'] }]);
  });

  it('drops items with non-matching roles', () => {
    const result = filterItemsByRole([{ id: 'x', roles: ['viewer'] }] as any, ['admin']);

    expect(result).toEqual([]);
  });
});
