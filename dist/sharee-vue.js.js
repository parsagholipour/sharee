import { defineComponent as a, ref as r, onMounted as s, onUnmounted as u, openBlock as p, createElementBlock as i } from "vue";
import { S as c } from "./Sharee.c0641b54.js";
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
  setup(t) {
    const n = t;
    console.log(n);
    const l = r(null), o = r(null);
    return s(() => {
      o.value = new c(l.value, n);
    }), u(() => {
      var e;
      (e = o.value) == null || e.destroy();
    }), (e, m) => (p(), i("div", {
      ref_key: "shareeEl",
      ref: l
    }, null, 512));
  }
});
export {
  _ as default
};
