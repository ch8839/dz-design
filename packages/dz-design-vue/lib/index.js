(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("vue-demi")) : typeof define === "function" && define.amd ? define(["exports", "vue-demi"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global["dz-design-vue"] = {}, global.vueDemi));
})(this, function(exports2, vueDemi) {
  "use strict";
  const Card = vueDemi.defineComponent({
    name: "DZCard",
    setup(props, {
      slots
    }) {
      vueDemi.onMounted(() => {
        console.log(">>>card");
      });
    },
    render() {
      const h = arguments[0];
      return h("div", {
        "class": ["card-container"]
      }, ["card11"]);
    }
  });
  Card.install = function(Vue) {
    Vue.components(Card);
  };
  const Switch = vueDemi.defineComponent({
    name: "DZSwitch",
    setup(props, {
      slots
    }) {
      vueDemi.onMounted(() => {
        console.log(">>>switch");
      });
    },
    render() {
      const h = arguments[0];
      return h("div", {
        "class": ["switch-container"]
      }, ["switch"]);
    }
  });
  Switch.install = function(Vue) {
    Vue.components(Switch);
  };
  const components = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    Card,
    Switch
  }, Symbol.toStringTag, { value: "Module" }));
  console.log(">>>components", components);
  exports2.Card = Card;
  exports2.Switch = Switch;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
});
//# sourceMappingURL=index.js.map
