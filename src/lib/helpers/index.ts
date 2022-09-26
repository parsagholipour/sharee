export function hasClass(element: any, className: string) {
  do {
    if (element?.className?.includes(className)) {
      return true;
    }
    element = element.parentNode;
  } while (element);
  return false;
}
