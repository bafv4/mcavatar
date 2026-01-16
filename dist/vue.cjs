"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/vue/index.ts
var vue_exports = {};
__export(vue_exports, {
  MinecraftAvatar: () => MinecraftAvatar_default,
  MinecraftFullBody: () => MinecraftFullBody_default
});
module.exports = __toCommonJS(vue_exports);

// src/vue/MinecraftAvatar.vue
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_vue3 = require("vue");
var _hoisted_1 = ["src", "alt", "width", "height", "loading"];
var STEVE_UUID = "8667ba71b85a4004af54457a9734eed7";
var MinecraftAvatar_default = /* @__PURE__ */ (0, import_vue.defineComponent)({
  props: {
    uuid: { type: String, required: true },
    mcid: { type: String, required: false },
    size: { type: Number, required: false, default: 64 },
    className: { type: String, required: false, default: "" },
    priority: { type: Boolean, required: false, default: false },
    apiEndpoint: { type: String, required: false, default: "/api/avatar" }
  },
  setup(__props) {
    const props = __props;
    const imgError = (0, import_vue3.ref)(false);
    const isLoading = (0, import_vue3.ref)(true);
    const imageUrl = (0, import_vue3.computed)(
      () => `${props.apiEndpoint}?uuid=${props.uuid}&size=${props.size}`
    );
    const fallbackUrl = (0, import_vue3.computed)(
      () => `${props.apiEndpoint}?uuid=${STEVE_UUID}&size=${props.size}`
    );
    const altText = (0, import_vue3.computed)(
      () => props.mcid ? `${props.mcid} \u306E\u30B9\u30AD\u30F3` : "Minecraft avatar"
    );
    (0, import_vue3.watch)(
      () => props.uuid,
      () => {
        imgError.value = false;
        isLoading.value = true;
      }
    );
    function handleLoad() {
      isLoading.value = false;
    }
    function handleError() {
      imgError.value = true;
      isLoading.value = false;
    }
    return (_ctx, _cache) => {
      return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
        "div",
        {
          class: (0, import_vue2.normalizeClass)(__props.className),
          style: (0, import_vue2.normalizeStyle)({
            width: `${__props.size}px`,
            height: `${__props.size}px`,
            position: "relative"
          })
        },
        [
          (0, import_vue2.createElementVNode)("img", {
            src: imgError.value ? fallbackUrl.value : imageUrl.value,
            alt: altText.value,
            width: __props.size,
            height: __props.size,
            style: (0, import_vue2.normalizeStyle)({
              imageRendering: "pixelated",
              display: isLoading.value ? "none" : "block",
              width: `${__props.size}px`,
              height: `${__props.size}px`
            }),
            loading: __props.priority ? "eager" : "lazy",
            decoding: "async",
            onLoad: handleLoad,
            onError: handleError
          }, null, 44, _hoisted_1),
          isLoading.value ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
            "div",
            {
              key: 0,
              style: (0, import_vue2.normalizeStyle)({
                width: `${__props.size}px`,
                height: `${__props.size}px`,
                backgroundColor: "#3c3c3c",
                position: "absolute",
                top: 0,
                left: 0
              })
            },
            null,
            4
            /* STYLE */
          )) : (0, import_vue2.createCommentVNode)("v-if", true)
        ],
        6
        /* CLASS, STYLE */
      );
    };
  }
});

// src/vue/MinecraftFullBody.vue
var import_vue4 = require("vue");
var import_vue5 = require("vue");
var import_vue6 = require("vue");
var _hoisted_12 = ["src", "alt", "width", "height", "loading"];
var STEVE_UUID2 = "8667ba71b85a4004af54457a9734eed7";
var MinecraftFullBody_default = /* @__PURE__ */ (0, import_vue4.defineComponent)({
  props: {
    uuid: { type: String, required: true },
    mcid: { type: String, required: false },
    width: { type: Number, required: false, default: 128 },
    height: { type: Number, required: false, default: 256 },
    pose: { type: null, required: false, default: "standing" },
    angle: { type: Number, required: false, default: 25 },
    className: { type: String, required: false, default: "" },
    priority: { type: Boolean, required: false, default: false },
    apiEndpoint: { type: String, required: false, default: "/api/fullbody" }
  },
  setup(__props) {
    const props = __props;
    const imgError = (0, import_vue6.ref)(false);
    const isLoading = (0, import_vue6.ref)(true);
    const imageUrl = (0, import_vue6.computed)(
      () => `${props.apiEndpoint}?uuid=${props.uuid}&width=${props.width}&height=${props.height}&pose=${props.pose}&angle=${props.angle}`
    );
    const fallbackUrl = (0, import_vue6.computed)(
      () => `${props.apiEndpoint}?uuid=${STEVE_UUID2}&width=${props.width}&height=${props.height}&pose=${props.pose}&angle=${props.angle}`
    );
    const altText = (0, import_vue6.computed)(
      () => props.mcid ? `${props.mcid} \u306E\u30D5\u30EB\u30DC\u30C7\u30A3` : "Minecraft full body avatar"
    );
    (0, import_vue6.watch)(
      () => [props.uuid, props.pose, props.angle, props.width, props.height],
      () => {
        imgError.value = false;
        isLoading.value = true;
      }
    );
    function handleLoad() {
      isLoading.value = false;
    }
    function handleError() {
      imgError.value = true;
      isLoading.value = false;
    }
    return (_ctx, _cache) => {
      return (0, import_vue5.openBlock)(), (0, import_vue5.createElementBlock)(
        "div",
        {
          class: (0, import_vue5.normalizeClass)(__props.className),
          style: (0, import_vue5.normalizeStyle)({
            width: `${__props.width}px`,
            height: `${__props.height}px`,
            position: "relative"
          })
        },
        [
          (0, import_vue5.createElementVNode)("img", {
            src: imgError.value ? fallbackUrl.value : imageUrl.value,
            alt: altText.value,
            width: __props.width,
            height: __props.height,
            style: (0, import_vue5.normalizeStyle)({
              imageRendering: "pixelated",
              display: isLoading.value ? "none" : "block",
              width: `${__props.width}px`,
              height: `${__props.height}px`
            }),
            loading: __props.priority ? "eager" : "lazy",
            decoding: "async",
            onLoad: handleLoad,
            onError: handleError
          }, null, 44, _hoisted_12),
          isLoading.value ? ((0, import_vue5.openBlock)(), (0, import_vue5.createElementBlock)(
            "div",
            {
              key: 0,
              style: (0, import_vue5.normalizeStyle)({
                width: `${__props.width}px`,
                height: `${__props.height}px`,
                backgroundColor: "#3c3c3c",
                position: "absolute",
                top: 0,
                left: 0
              })
            },
            null,
            4
            /* STYLE */
          )) : (0, import_vue5.createCommentVNode)("v-if", true)
        ],
        6
        /* CLASS, STYLE */
      );
    };
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MinecraftAvatar,
  MinecraftFullBody
});
//# sourceMappingURL=vue.cjs.map