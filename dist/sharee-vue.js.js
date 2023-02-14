import { defineComponent as a, ref as o, onMounted as u, onUnmounted as s, openBlock as p, createElementBlock as i } from "vue";
import { S as m } from "./Sharee.9ccd06e5.js";
import "lodash.merge";
const _ = /* @__PURE__ */ a({
  __name: "Sharee",
  props: {
    lang: null,
    langs: null,
    onLoad: null,
    drivers: null,
    showTransitionDuration: null,
    shareLink: null,
    shareText: null,
    ripple: { type: Boolean },
    mode: null,
    modeOptions: null
  },
  setup(r) {
    const t = r, n = o(null), l = o(null);
    return u(() => {
      l.value = new m(n.value, t);
    }), s(() => {
      var e;
      (e = l.value) == null || e.destroy();
    }), (e, c) => (p(), i("div", {
      ref_key: "shareeEl",
      ref: n
    }, null, 512));
  }
});
export {
  _ as default
};
