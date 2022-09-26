function u(r, a) {
  var s;
  do {
    if ((s = r == null ? void 0 : r.className) != null && s.includes(a))
      return !0;
    r = r.parentNode;
  } while (r);
  return !1;
}
export {
  u as hasClass
};
