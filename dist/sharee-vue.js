import { defineComponent as t, ref as o, onMounted as u, onUnmounted as s, createElementBlock as p, openBlock as i } from "vue";
import { S as c } from "./Sharee-DyaRjgBK.js";
const f = /* @__PURE__ */ t({
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
    const a = r, n = o(null), l = o(null);
    return u(() => {
      l.value = new c(n.value, a);
    }), s(() => {
      var e;
      (e = l.value) == null || e.destroy();
    }), (e, m) => (i(), p("div", {
      ref_key: "shareeEl",
      ref: n
    }, null, 512));
  }
});
export {
  f as default
};
