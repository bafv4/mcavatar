// src/vue/MinecraftAvatar.vue
import { defineComponent as _defineComponent } from "vue";
import { normalizeStyle as _normalizeStyle, createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, normalizeClass as _normalizeClass } from "vue";
import { ref, computed, watch } from "vue";
var _hoisted_1 = ["src", "alt", "width", "height", "loading"];
var STEVE_UUID = "8667ba71b85a4004af54457a9734eed7";
var MinecraftAvatar_default = /* @__PURE__ */ _defineComponent({
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
    const imgError = ref(false);
    const isLoading = ref(true);
    const imageUrl = computed(
      () => `${props.apiEndpoint}?uuid=${props.uuid}&size=${props.size}`
    );
    const fallbackUrl = computed(
      () => `${props.apiEndpoint}?uuid=${STEVE_UUID}&size=${props.size}`
    );
    const altText = computed(
      () => props.mcid ? `${props.mcid} \u306E\u30B9\u30AD\u30F3` : "Minecraft avatar"
    );
    watch(
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
      return _openBlock(), _createElementBlock(
        "div",
        {
          class: _normalizeClass(__props.className),
          style: _normalizeStyle({
            width: `${__props.size}px`,
            height: `${__props.size}px`,
            position: "relative"
          })
        },
        [
          _createElementVNode("img", {
            src: imgError.value ? fallbackUrl.value : imageUrl.value,
            alt: altText.value,
            width: __props.size,
            height: __props.size,
            style: _normalizeStyle({
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
          isLoading.value ? (_openBlock(), _createElementBlock(
            "div",
            {
              key: 0,
              style: _normalizeStyle({
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
          )) : _createCommentVNode("v-if", true)
        ],
        6
        /* CLASS, STYLE */
      );
    };
  }
});

// src/vue/MinecraftFullBody.vue
import { defineComponent as _defineComponent2 } from "vue";
import { normalizeStyle as _normalizeStyle2, createElementVNode as _createElementVNode2, openBlock as _openBlock2, createElementBlock as _createElementBlock2, createCommentVNode as _createCommentVNode2, normalizeClass as _normalizeClass2 } from "vue";
import { ref as ref2, computed as computed2, watch as watch2 } from "vue";
var _hoisted_12 = ["src", "alt", "width", "height", "loading"];
var STEVE_UUID2 = "8667ba71b85a4004af54457a9734eed7";
var MinecraftFullBody_default = /* @__PURE__ */ _defineComponent2({
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
    const imgError = ref2(false);
    const isLoading = ref2(true);
    const imageUrl = computed2(
      () => `${props.apiEndpoint}?uuid=${props.uuid}&width=${props.width}&height=${props.height}&pose=${props.pose}&angle=${props.angle}`
    );
    const fallbackUrl = computed2(
      () => `${props.apiEndpoint}?uuid=${STEVE_UUID2}&width=${props.width}&height=${props.height}&pose=${props.pose}&angle=${props.angle}`
    );
    const altText = computed2(
      () => props.mcid ? `${props.mcid} \u306E\u30D5\u30EB\u30DC\u30C7\u30A3` : "Minecraft full body avatar"
    );
    watch2(
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
      return _openBlock2(), _createElementBlock2(
        "div",
        {
          class: _normalizeClass2(__props.className),
          style: _normalizeStyle2({
            width: `${__props.width}px`,
            height: `${__props.height}px`,
            position: "relative"
          })
        },
        [
          _createElementVNode2("img", {
            src: imgError.value ? fallbackUrl.value : imageUrl.value,
            alt: altText.value,
            width: __props.width,
            height: __props.height,
            style: _normalizeStyle2({
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
          isLoading.value ? (_openBlock2(), _createElementBlock2(
            "div",
            {
              key: 0,
              style: _normalizeStyle2({
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
          )) : _createCommentVNode2("v-if", true)
        ],
        6
        /* CLASS, STYLE */
      );
    };
  }
});
export {
  MinecraftAvatar_default as MinecraftAvatar,
  MinecraftFullBody_default as MinecraftFullBody
};
//# sourceMappingURL=vue.js.map