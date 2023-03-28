import { defineComponent, onMounted } from "vue-demi";
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
    }, ["card11"]);
  }
});
export {
  Card as default
};
//# sourceMappingURL=card.js.map
