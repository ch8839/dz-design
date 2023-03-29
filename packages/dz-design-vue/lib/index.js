(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("vue-demi"), require("@vue/composition-api"), require("vue")) : typeof define === "function" && define.amd ? define(["exports", "vue-demi", "@vue/composition-api", "vue"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global["dz-design-vue"] = {}, global.vueDemi, global.compositionApi, global.Vue));
})(this, function(exports2, vueDemi, compositionApi, Vue) {
  "use strict";
  const card = "";
  var vSlotsDirective = {
    /* bind(el: HTMLElement, binding: any, vnode: VNode) {
    } */
  };
  function getSlotsInRender(ins, name) {
    var _a, _b;
    if (name === void 0) {
      name = "default";
    }
    return ins.$slots[name] || ((_b = (_a = ins.$scopedSlots)[name]) === null || _b === void 0 ? void 0 : _b.call(_a));
  }
  function hasProp(vc, prop) {
    if (vc && vc.$options) {
      return prop in vc.$options.propsData;
    }
    return false;
  }
  Vue.directive("slots", vSlotsDirective);
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
      return typeof obj2;
    } : function(obj2) {
      return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    }, _typeof(obj);
  }
  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null)
      return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== void 0) {
      var res = prim.call(input, hint || "default");
      if (_typeof(res) !== "object")
        return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return _typeof(key) === "symbol" ? key : String(key);
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  var zIndex = 2e3;
  var stack = [];
  function getPopupContainer() {
    return document.body;
  }
  var DEFAULT_CONFIG = {
    prefixCls: "mtd",
    iconPrefixCls: "mtdicon",
    getPopupContainer,
    getNextZIndex: function getNextZIndex() {
      return zIndex++;
    },
    addPopup: function addPopup(instance) {
      if (stack.indexOf(instance) === -1) {
        stack.push(instance);
      }
    },
    removePopup: function removePopup(instance) {
      var index = stack.lastIndexOf(instance);
      if (index > -1) {
        stack.splice(index, 1);
      }
    },
    getLastPopup: function getLastPopup() {
      if (stack.length > 0) {
        return stack[stack.length - 1];
      }
    }
  };
  function getConfig() {
    return DEFAULT_CONFIG;
  }
  function getPrefix() {
    return DEFAULT_CONFIG.prefixCls;
  }
  function getPrefixCls(suffixCls, customizePrefixCls) {
    return customizePrefixCls || "".concat(DEFAULT_CONFIG.prefixCls, "-").concat(suffixCls);
  }
  function getIconCls(suffixCls, customizePrefixCls) {
    var iconPrefixCls = DEFAULT_CONFIG.iconPrefixCls;
    return customizePrefixCls || "".concat(iconPrefixCls, " ").concat(iconPrefixCls, "-").concat(suffixCls || "");
  }
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) {
        symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      }
      keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      if (i % 2) {
        ownKeys(Object(source), true).forEach(function(key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }
    return target;
  }
  var CONFIG_PROVIDER = "MTD_NEXT_Config";
  function combine(option1, option2) {
    var option = _objectSpread({}, option1);
    Object.keys(option2).forEach(function(key) {
      var value = option2[key];
      if (value !== void 0) {
        option[key] = value;
      }
    });
    return option;
  }
  function useConfig() {
    var defaultOptions = compositionApi.computed(function() {
      return getConfig();
    });
    var config = compositionApi.inject(CONFIG_PROVIDER, {
      options: defaultOptions,
      getPrefix,
      getPrefixCls,
      getIconCls,
      getPopupContainer
    });
    return config;
  }
  function useConfigProvider(opt) {
    var parentConfig = useConfig();
    var options = compositionApi.computed(function() {
      return combine(parentConfig.options.value, opt);
    });
    var prefix = compositionApi.computed(function() {
      return options.value.prefixCls;
    });
    var iconPrefix = compositionApi.computed(function() {
      return options.value.iconPrefixCls;
    });
    var getPrefixCls2 = function getPrefixCls3(suffixCls) {
      return "".concat(prefix.value, "-").concat(suffixCls);
    };
    var getPrefix2 = function getPrefix3() {
      return prefix.value;
    };
    var getIconCls2 = function getIconCls3(suffixCls) {
      return suffixCls ? "".concat(iconPrefix.value, " ").concat(iconPrefix.value, "-").concat(suffixCls) : iconPrefix.value;
    };
    var context = {
      options,
      getPrefix: getPrefix2,
      getPrefixCls: getPrefixCls2,
      getIconCls: getIconCls2,
      getPopupContainer: options.value.getPopupContainer
    };
    compositionApi.provide(CONFIG_PROVIDER, context);
    return context;
  }
  const ConfigProvider = compositionApi.defineComponent({
    name: "MtdConfigProvider",
    props: {
      prefixCls: String,
      iconPrefixCls: String,
      tag: {
        type: String,
        default: "div"
      },
      getPopupContainer: Function
    },
    setup: function setup(props2) {
      var config = useConfigProvider(props2);
      return {
        config
      };
    },
    render: function render() {
      var tag = this.tag, prefixCls = this.prefixCls;
      return compositionApi.h("div", {
        "attrs": {
          "is": tag
        },
        "class": "".concat(prefixCls, "-config-provider")
      }, [this.$slots.default]);
    }
  });
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr))
      return arr;
  }
  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
      var _s, _e, _x, _r, _arr = [], _n = true, _d = false;
      try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i)
            return;
          _n = false;
        } else
          for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = true)
            ;
      } catch (err) {
        _d = true, _e = err;
      } finally {
        try {
          if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r))
            return;
        } finally {
          if (_d)
            throw _e;
        }
      }
      return _arr;
    }
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++)
      arr2[i] = arr[i];
    return arr2;
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o)
      return;
    if (typeof o === "string")
      return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor)
      n = o.constructor.name;
    if (n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray(o, minLen);
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr))
      return _arrayLikeToArray(arr);
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
      return Array.from(iter);
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  var withInstall = function withInstall2(main, extra) {
    main.install = function(app) {
      for (var _i = 0, _arr = [main].concat(_toConsumableArray(Object.values(extra !== null && extra !== void 0 ? extra : {}))); _i < _arr.length; _i++) {
        var comp2 = _arr[_i];
        app.component(comp2.name, comp2);
      }
    };
    if (extra) {
      for (var _i2 = 0, _Object$entries = Object.entries(extra); _i2 < _Object$entries.length; _i2++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i2], 2), key = _Object$entries$_i[0], comp = _Object$entries$_i[1];
        main[key] = comp;
      }
    }
    return main;
  };
  withInstall(ConfigProvider);
  const Card$2 = compositionApi.defineComponent({
    name: "MtdCard",
    inheritAttrs: true,
    props: {
      title: {
        type: String
      },
      shadow: {
        type: String,
        default: "always"
      },
      bodyClass: String,
      titleClass: String
    },
    emits: [],
    setup: function setup() {
      var config = useConfig();
      var prefix = compositionApi.computed(function() {
        return config.getPrefixCls("card");
      });
      return {
        prefix
      };
    },
    render: function render() {
      var prefix = this.prefix, shadow = this.shadow, titleClass = this.titleClass, bodyClass = this.bodyClass, title = this.title;
      return compositionApi.h("div", {
        "class": [prefix, shadow ? "".concat(prefix, "-") + shadow + "-shadow" : "".concat(prefix, "-always-shadow")]
      }, [(this.$slots.title || title) && compositionApi.h("div", {
        "class": ["".concat(prefix, "-title"), titleClass]
      }, [this.$slots.title || title]), this.$slots.extra && compositionApi.h("div", {
        "class": "".concat(prefix, "-extra")
      }, [this.$slots.extra]), compositionApi.h("div", {
        "class": ["".concat(prefix, "-body"), bodyClass]
      }, [this.$slots.default])]);
    }
  });
  const Card$1 = withInstall(Card$2);
  const props$1 = {
    title: {
      type: String
    }
  };
  const Card = vueDemi.defineComponent({
    name: "DZCard",
    components: {
      Card: Card$1
    },
    props: props$1,
    setup(props2, {
      slots
    }) {
      vueDemi.onMounted(() => {
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
  const _switch = "";
  function getArcLength(percent, radius) {
    return percent * 2 * radius * Math.PI;
  }
  const LoadingCircle = compositionApi.defineComponent({
    name: "MtdLoadingCircle",
    inheritAttrs: true,
    props: {
      thickness: {
        type: Number,
        default: 2
      },
      size: {
        type: Number,
        default: 20
      },
      color: {
        type: String,
        default: "currentColor"
      },
      disableShrink: {
        type: Boolean,
        default: false
      }
    },
    setup: function setup() {
      var config = useConfig();
      var prefixMTD = compositionApi.computed(function() {
        return config.getPrefix();
      });
      var scalePathTimer = compositionApi.ref(void 0);
      return {
        scalePathTimer,
        prefixMTD
      };
    },
    computed: {
      sizeNumber: function sizeNumber() {
        return this.size;
      },
      diameter: function diameter() {
        return getArcLength(1, (this.sizeNumber - this.thickness) / 2);
      },
      radius: function radius() {
        return (this.sizeNumber - this.thickness) / 2;
      },
      center: function center() {
        return this.sizeNumber / 2;
      },
      style: function style() {
        return {
          width: "".concat(this.sizeNumber, "px"),
          height: "".concat(this.sizeNumber, "px")
        };
      }
    },
    watch: {
      disableShrink: function disableShrink(n) {
        !n ? this.scalePath(this.$refs.path) : clearTimeout(this.scalePathTimer);
      }
    },
    mounted: function mounted() {
      var path = this.$refs.path, disableShrink = this.disableShrink;
      if (!disableShrink) {
        this.scalePath(path);
      }
    },
    beforeUnmount: function beforeUnmount() {
      clearTimeout(this.scalePathTimer);
    },
    methods: {
      scalePath: function scalePath(path) {
        var _this = this;
        var step = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
        var diameter = this.diameter;
        step = step % 3;
        switch (step) {
          case 0:
            path.style.transitionDuration = "0ms";
            path.style.strokeDasharray = "3 ".concat(diameter);
            path.style.strokeDashoffset = "0";
            break;
          case 1:
            path.style.transitionDuration = "700ms";
            path.style.strokeDasharray = "".concat(0.7 * diameter, " ").concat(diameter);
            path.style.strokeDashoffset = -0.3 * diameter;
            break;
          case 2:
            path.style.transitionDuration = "700ms";
            path.style.strokeDasharray = "".concat(0.7 * diameter, " ").concat(diameter);
            path.style.strokeDashoffset = 3 - diameter;
            break;
        }
        this.scalePathTimer = setTimeout(function() {
          _this.scalePath(path, step + 1);
        }, step ? 700 : 100);
      }
    },
    render: function render() {
      var style = this.style, sizeNumber = this.sizeNumber, center = this.center, radius = this.radius, thickness = this.thickness, color = this.color, prefixMTD = this.prefixMTD;
      return compositionApi.h("svg", {
        "style": style,
        "class": "".concat(prefixMTD, "-loading-circle"),
        "attrs": {
          "viewBox": "0 0 ".concat(sizeNumber, " ").concat(sizeNumber)
        }
      }, [compositionApi.h("circle", {
        "class": "",
        "ref": "path",
        "attrs": {
          "cx": center,
          "cy": center,
          "r": radius,
          "fill": "none",
          "stroke-linecap": "round",
          "stroke-width": thickness,
          "stroke": color
        },
        "style": "stroke-dasharray: 25px 1000px; stroke-dashoffset: 0px;"
      })]);
    }
  });
  var vueInstance = function vueInstance2() {
    var _getCurrentInstance;
    var instance = (_getCurrentInstance = compositionApi.getCurrentInstance()) === null || _getCurrentInstance === void 0 ? void 0 : _getCurrentInstance.proxy;
    return instance;
  };
  const vueInstance$1 = vueInstance;
  var formItemSymbol = Symbol("dropdown");
  var useProvider$1 = function useProvider2() {
    function provideFormItem(ins) {
      compositionApi.provide(formItemSymbol, ins);
    }
    function injectFormItem() {
      return compositionApi.inject(formItemSymbol, null);
    }
    return {
      provideFormItem,
      injectFormItem
    };
  };
  const useProvide = useProvider$1;
  var formSymbol = Symbol("form");
  var useProvider = function useProvider2() {
    function provideForm(ins) {
      compositionApi.provide(formSymbol, ins);
    }
    function injectForm() {
      return compositionApi.inject(formSymbol, null);
    }
    return {
      provideForm,
      injectForm
    };
  };
  const useFormProvide = useProvider;
  function useFormItem(props2, ctx) {
    var ins = vueInstance$1();
    var _useProvide = useProvide(), injectFormItem = _useProvide.injectFormItem;
    var formItem = injectFormItem();
    var hasProp$1 = compositionApi.computed(function() {
      return !!(formItem && formItem.prop);
    });
    var loading = compositionApi.computed(function() {
      if (hasProp(ins, "loading")) {
        return props2.loading;
      }
      return formItem && formItem.status === "validating";
    });
    var status = compositionApi.computed(function() {
      if (hasProp(ins, "status")) {
        return props2.status;
      }
      return formItem && formItem.status;
    });
    var hasFeedback = compositionApi.computed(function() {
      if (!status.value) {
        return false;
      }
      if (hasProp(ins, "hasFeedback")) {
        return props2.hasFeedback;
      }
      return formItem && formItem.hasFeedback;
    });
    var _useFormProvide = useFormProvide(), injectForm = _useFormProvide.injectForm;
    var form = injectForm();
    var disabled = compositionApi.computed(function() {
      return ins.$options.propsData.disabled !== void 0 ? props2.disabled : form ? form.disabled : false;
    });
    function _handleBlur() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      ctx.emit.apply(ctx, ["blur"].concat(args));
      if (
        /* !options.blur &&  */
        hasProp$1.value
      ) {
        compositionApi.nextTick(function() {
          formItem && formItem.emitter.emit("formBlur");
        });
      }
    }
    function _handleChange() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      ctx.emit.apply(ctx, ["change"].concat(args));
      if (hasProp$1.value) {
        compositionApi.nextTick(function() {
          formItem && formItem.emitter.emit("formChange");
        });
      }
    }
    return {
      status,
      hasFeedback,
      loading,
      disabled,
      _handleBlur,
      _handleChange
    };
  }
  const Switch$2 = compositionApi.defineComponent({
    name: "MtdSwitch",
    components: {
      LoadingCircle
    },
    inheritAttrs: true,
    model: {
      prop: "modelValue",
      event: "update:modelValue"
    },
    props: {
      modelValue: [String, Number, Boolean, Function, Object, Array, Symbol],
      trueValue: {
        type: [String, Number, Boolean, Function, Object, Array, Symbol],
        default: true
      },
      falseValue: {
        type: [String, Number, Boolean, Function, Object, Array, Symbol],
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      size: {
        type: String,
        default: ""
      },
      loading: {
        type: Boolean,
        default: false
      },
      name: String,
      checkedChildren: String,
      unCheckedChildren: String
    },
    slots: ["checkedChildren", "unCheckedChildren"],
    emits: ["change", "input"],
    setup: function setup(props2, ctx) {
      var emit = ctx.emit;
      var config = useConfig();
      var prefix = config.getPrefixCls("switch");
      var formItemHook = useFormItem(props2, ctx);
      var disabled = formItemHook.disabled;
      var _actived = compositionApi.computed(function() {
        return props2.modelValue === props2.trueValue;
      });
      var wrapperCls = compositionApi.computed(function() {
        var _ref;
        return ["".concat(prefix), (_ref = {}, _defineProperty(_ref, "".concat(prefix, "-active"), _actived.value), _defineProperty(_ref, "".concat(prefix, "-disabled"), disabled.value || props2.loading), _defineProperty(_ref, "".concat(prefix, "-").concat(props2.size), props2.size), _defineProperty(_ref, "".concat(prefix, "-loading"), props2.loading), _ref)];
      });
      var handleClick = function handleClick2(e) {
        e.preventDefault();
        if (disabled.value || props2.loading) {
          return false;
        }
        var value = _actived.value ? props2.falseValue : props2.trueValue;
        emit("input", value);
        emit("update:modelValue", value);
        emit("change", value);
      };
      return {
        _actived,
        wrapperCls,
        prefix,
        handleClick,
        sDisabled: formItemHook.disabled
      };
    },
    render: function render() {
      var _actived = this._actived, wrapperCls = this.wrapperCls, prefix = this.prefix, handleClick = this.handleClick, size = this.size;
      var _this$$props = this.$props, loading = _this$$props.loading, checkedChildren = _this$$props.checkedChildren, unCheckedChildren = _this$$props.unCheckedChildren;
      return compositionApi.h("span", {
        "class": wrapperCls,
        "on": {
          "click": handleClick
        }
      }, [compositionApi.h("span", {
        "class": "".concat(prefix, "-btn")
      }, [loading && compositionApi.h("loading-circle", {
        "attrs": {
          "thickness": 1,
          "size": size === "large" ? 15 : 12
        }
      })]), compositionApi.h("span", {
        "class": "".concat(prefix, "-inner")
      }, [_actived ? getSlotsInRender(this, "checkedChildren") || checkedChildren : getSlotsInRender(this, "unCheckedChildren") || unCheckedChildren])]);
    }
  });
  const Switch$1 = withInstall(Switch$2);
  const props = {
    modelValue: {
      type: Boolean
    },
    size: {
      type: String
    },
    loading: {
      type: Boolean
    },
    disabled: {
      type: Boolean
    }
  };
  const Switch = vueDemi.defineComponent({
    name: "DZSwitch",
    components: {
      "mtd-switch": Switch$1
    },
    model: {
      prop: "modelValue",
      event: "update:modelValue"
    },
    props,
    setup(props2, {
      slots,
      emit
    }) {
      vueDemi.onMounted(() => {
        console.log(">>>switch", props2);
      });
      const changeValue = (value) => {
        console.log(">>>value", value);
        emit("update:modelValue", value);
      };
      return {
        changeValue
      };
    },
    render() {
      const h = arguments[0];
      const {
        modelValue,
        size,
        disabled,
        loading,
        changeValue
      } = this;
      return h("div", {
        "class": ["switch-container"]
      }, [h("mtd-switch", {
        "attrs": {
          "modelValue": modelValue,
          "size": size,
          "loading": loading,
          "disabled": disabled
        },
        "on": {
          ...{
            "update:modelValue": changeValue
          }
        }
      })]);
    }
  });
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
