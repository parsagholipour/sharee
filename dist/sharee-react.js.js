import { jsx as o } from "react/jsx-runtime";
import { useRef as u, useEffect as f } from "react";
import { S as s } from "./Sharee-SHsZheQr.js";
function m(e) {
  const r = u(null), t = u(null);
  return f(() => (t.current = new s(r.current, e), () => {
    var n;
    (n = t.current) == null || n.destroy();
  }), [e]), /* @__PURE__ */ o("div", { ref: r });
}
export {
  m as default
};
