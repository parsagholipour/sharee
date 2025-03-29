import { useRef as o, useEffect as u } from "react";
import { S as f } from "./Sharee.36f210a1.js";
import { jsx as s } from "react/jsx-runtime";
import "lodash.merge";
function l(r) {
  const e = o(null), t = o(null);
  return u(() => (t.current = new f(e.current, r), () => {
    var n;
    (n = t.current) == null || n.destroy();
  }), [r]), /* @__PURE__ */ s("div", {
    ref: e
  });
}
export {
  l as default
};
