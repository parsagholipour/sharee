import { useRef as n, useEffect as u } from "react";
import { S as o } from "./Sharee.55f9ad49.js";
import { jsx as f } from "react/jsx-runtime";
import "lodash.merge";
function m(e) {
  const t = n(null), r = n(null);
  return u(() => () => {
    r.current && r.current.destroy(), r.current = new o(t.current, e);
  }, [e]), /* @__PURE__ */ f("div", {
    ref: t
  });
}
export {
  m as default
};
