export function hasClass(element: any, className: string) {
  do {
    if (typeof element?.className?.includes !== 'undefined' && element?.className?.includes(className)) {
      return true;
    }
    element = element.parentNode;
  } while (element);
  return false;
}
