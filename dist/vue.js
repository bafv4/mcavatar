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
export {
  MinecraftAvatar_default as MinecraftAvatar
};
//# sourceMappingURL=vue.js.map