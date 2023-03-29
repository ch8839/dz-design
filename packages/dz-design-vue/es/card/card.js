import { defineComponent, onMounted } from "vue-demi";
import "../node_modules/.pnpm/@ss_mtd-vue2@1.1.2-alpha.13_typescript@4.9.5/node_modules/@ss/mtd-vue2/lib/theme-chalk/card.css.js";
import Card$1 from "../node_modules/.pnpm/@ss_mtd-vue2@1.1.2-alpha.13_typescript@4.9.5/node_modules/@ss/mtd-vue2/es/card/index.js";
import props from "./props.js";
const Card = defineComponent({
  name: "DZCard",
  components: {
    Card: Card$1
  },
  props,
  setup(props2, {
    slots
  }) {
    onMounted(() => {
      console.log(">>>card", slots);
    });
  },
  render() {
    const h = arguments[0];
    const {
      title
    } = this;
    return h("div", {
      "class": ["card-container"]
    }, [h(Card$1, {
      "attrs": {
        "title": title
      }
    }, [this.$slots.default])]);
  }
});
export {
  Card as default
};
//# sourceMappingURL=card.js.map
