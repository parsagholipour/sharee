import { defineComponent as a, ref as r, onMounted as u, onUnmounted as s, openBlock as p, createElementBlock as c } from "vue";
import i from "../lib/Sharee.js";
const f = /* @__PURE__ */ a({
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
  setup(t) {
    const n = t;
    console.log(n);
    const l = r(null), o = r(null);
    return u(() => {
      o.value = new i(l.value, n);
    }), s(() => {
      var e;
      (e = o.value) == null || e.destroy();
    }), (e, m) => (p(), c("div", {
      ref_key: "shareeEl",
      ref: l
    }, null, 512));
  }
});
export {
  f as default
};
