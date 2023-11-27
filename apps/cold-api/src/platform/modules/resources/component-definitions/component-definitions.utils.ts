export function filterItemsByRole(items: any, rolesToMatch: string[]): any[] {
  if (!items) {
    return items;
  }
  const _items = items.filter(item => {
    if (!item.roles) {
      return true;
    }
    if (item.roles && item.roles.some(role => rolesToMatch.includes(role))) {
      // Skip the object if any of the roles match the supplied array
      if (item.items && item.items.length > 0) {
        // Recursive call to process nested sub_menus
        item.items = filterItemsByRole(item.items, rolesToMatch);
        return item;
      } else {
        return true;
      }
    }
  });

  return _items;
}
