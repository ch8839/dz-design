import { defineComponent, onMounted } from "vue-demi";
import { Card as Card$1 } from "@ss/mtd-vue2";
import props from "./props.js";
const Card = defineComponent({
  name: "DzCard",
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
