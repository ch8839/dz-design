import { defineComponent, onMounted } from "vue-demi";
import "./index.scss.js";
const Card = defineComponent({
  name: "DZCard",
  setup(props, {
    slots
  }) {
    onMounted(() => {
      console.log(">>>card");
    });
  },
  render() {
    const h = arguments[0];
    return h("div", {
      "class": ["card-container"]
    }, ["card"]);
  }
});
export {
  Card as default
};
//# sourceMappingURL=card.js.map
