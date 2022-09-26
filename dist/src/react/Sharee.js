import { useRef as n, useEffect as u } from "react";
import f from "../lib/Sharee.js";
import { jsx as o } from "../../_virtual/jsx-runtime.js";
function i(e) {
  const t = n(null), r = n(null);
  return u(() => () => {
    r.current && r.current.destroy(), r.current = new f(t.current, e);
  }, [e]), /* @__PURE__ */ o("div", {
    ref: t
  });
}
export {
  i as default
};
