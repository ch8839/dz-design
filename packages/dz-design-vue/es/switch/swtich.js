import { defineComponent, onMounted } from "vue-demi";
import "./index.scss.js";
const Switch = defineComponent({
  name: "DZSwitch",
  setup(props, {
    slots
  }) {
    onMounted(() => {
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
export {
  Switch as default
};
//# sourceMappingURL=swtich.js.map
