// src/vue/MinecraftAvatar.vue
import { defineComponent as _defineComponent } from "vue";
import { createCommentVNode as _createCommentVNode, normalizeStyle as _normalizeStyle, createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, normalizeClass as _normalizeClass, Fragment as _Fragment } from "vue";
import { ref, computed, watch, onMounted } from "vue";
var _hoisted_1 = ["src", "alt", "width", "height"];
var _hoisted_2 = ["src", "alt", "width", "height"];
var STEVE_UUID = "8667ba71b85a4004af54457a9734eed7";
var MinecraftAvatar_default = /* @__PURE__ */ _defineComponent({
  props: {
    uuid: { type: String, required: true },
    mcid: { type: String, required: false },
    size: { type: Number, required: false, default: 64 },
    overlay: { type: Boolean, required: false, default: true },
    className: { type: String, required: false, default: "" },
    apiEndpoint: { type: String, required: false }
  },
  setup(__props) {
    const HEAD_BASE = { x: 8, y: 8, width: 8, height: 8 };
    const HEAD_OVERLAY = { x: 40, y: 8, width: 8, height: 8 };
    const props = __props;
    const imgError = ref(false);
    const isLoading = ref(true);
    const imgSrc = ref(null);
    const imageUrl = computed(
      () => `${props.apiEndpoint}?uuid=${props.uuid}&size=${props.size}&overlay=${props.overlay}`
    );
    const fallbackUrl = computed(
      () => `${props.apiEndpoint}?uuid=${STEVE_UUID}&size=${props.size}&overlay=${props.overlay}`
    );
    const altText = computed(
      () => props.mcid ? `${props.mcid}'s avatar` : "Minecraft avatar"
    );
    watch(
      () => props.uuid,
      () => {
        imgError.value = false;
        isLoading.value = true;
        if (!props.apiEndpoint) {
          renderAvatar();
        }
      }
    );
    watch(
      () => [props.size, props.overlay],
      () => {
        if (!props.apiEndpoint) {
          renderAvatar();
        }
      }
    );
    function handleLoad() {
      isLoading.value = false;
    }
    function handleError() {
      imgError.value = true;
      isLoading.value = false;
    }
    async function renderAvatar() {
      isLoading.value = true;
      imgError.value = false;
      const skinUrl = `https://crafatar.com/skins/${props.uuid}`;
      const fallbackSkinUrl = `https://crafatar.com/skins/${STEVE_UUID}`;
      const loadImage = (url) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = url;
        });
      };
      try {
        let skinImage;
        try {
          skinImage = await loadImage(skinUrl);
        } catch {
          skinImage = await loadImage(fallbackSkinUrl);
        }
        const extractCanvas = document.createElement("canvas");
        extractCanvas.width = 8;
        extractCanvas.height = 8;
        const extractCtx = extractCanvas.getContext("2d");
        if (!extractCtx) return;
        extractCtx.imageSmoothingEnabled = false;
        extractCtx.drawImage(
          skinImage,
          HEAD_BASE.x,
          HEAD_BASE.y,
          HEAD_BASE.width,
          HEAD_BASE.height,
          0,
          0,
          8,
          8
        );
        if (props.overlay) {
          extractCtx.drawImage(
            skinImage,
            HEAD_OVERLAY.x,
            HEAD_OVERLAY.y,
            HEAD_OVERLAY.width,
            HEAD_OVERLAY.height,
            0,
            0,
            8,
            8
          );
        }
        const outputCanvas = document.createElement("canvas");
        outputCanvas.width = props.size;
        outputCanvas.height = props.size;
        const outputCtx = outputCanvas.getContext("2d");
        if (!outputCtx) return;
        outputCtx.imageSmoothingEnabled = false;
        outputCtx.drawImage(extractCanvas, 0, 0, props.size, props.size);
        imgSrc.value = outputCanvas.toDataURL("image/png");
        isLoading.value = false;
      } catch (err) {
        console.error("Failed to render avatar:", err);
        imgError.value = true;
        isLoading.value = false;
      }
    }
    onMounted(() => {
      if (!props.apiEndpoint) {
        renderAvatar();
      }
    });
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock(
        _Fragment,
        null,
        [
          _createCommentVNode(" Server-side rendering mode "),
          __props.apiEndpoint ? (_openBlock(), _createElementBlock(
            "div",
            {
              key: 0,
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
                loading: "lazy",
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
          )) : (_openBlock(), _createElementBlock(
            _Fragment,
            { key: 1 },
            [
              _createCommentVNode(" Client-side rendering mode "),
              _createElementVNode(
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
                  imgSrc.value && !isLoading.value ? (_openBlock(), _createElementBlock("img", {
                    key: 0,
                    src: imgSrc.value,
                    alt: altText.value,
                    width: __props.size,
                    height: __props.size,
                    style: _normalizeStyle({
                      imageRendering: "pixelated",
                      width: `${__props.size}px`,
                      height: `${__props.size}px`
                    })
                  }, null, 12, _hoisted_2)) : _createCommentVNode("v-if", true),
                  isLoading.value || imgError.value ? (_openBlock(), _createElementBlock(
                    "div",
                    {
                      key: 1,
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
              )
            ],
            2112
            /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
          ))
        ],
        2112
        /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
      );
    };
  }
});

// src/vue/MinecraftFullBody.vue
import { defineComponent as _defineComponent2 } from "vue";
import { createCommentVNode as _createCommentVNode2, normalizeStyle as _normalizeStyle2, createElementVNode as _createElementVNode2, openBlock as _openBlock2, createElementBlock as _createElementBlock2, normalizeClass as _normalizeClass2, Fragment as _Fragment2 } from "vue";
import { ref as ref2, computed as computed2, watch as watch2, onMounted as onMounted2, onUnmounted } from "vue";
var _hoisted_12 = ["src", "alt", "width", "height"];
var _hoisted_22 = ["aria-label"];
var STEVE_UUID2 = "8667ba71b85a4004af54457a9734eed7";
var MinecraftFullBody_default = /* @__PURE__ */ _defineComponent2({
  props: {
    uuid: { type: String, required: true },
    mcid: { type: String, required: false },
    width: { type: Number, required: false, default: 300 },
    height: { type: Number, required: false, default: 400 },
    pose: { type: null, required: false, default: "standing" },
    angle: { type: Number, required: false, default: 25 },
    elevation: { type: Number, required: false, default: 10 },
    zoom: { type: Number, required: false, default: 0.9 },
    className: { type: String, required: false, default: "" },
    background: { type: String, required: false },
    walk: { type: Boolean, required: false, default: false },
    run: { type: Boolean, required: false, default: false },
    rotate: { type: Boolean, required: false, default: false },
    apiEndpoint: { type: String, required: false }
  },
  setup(__props) {
    const POSE_ROTATIONS = {
      standing: {
        head: { x: 0, y: 0, z: 0 },
        body: { x: 0, y: 0, z: 0 },
        leftArm: { x: 0, y: 0, z: 0.05 },
        rightArm: { x: 0, y: 0, z: -0.05 },
        leftLeg: { x: 0, y: 0, z: 0 },
        rightLeg: { x: 0, y: 0, z: 0 }
      },
      walking: {
        head: { x: 0, y: 0, z: 0 },
        body: { x: 0, y: 0, z: 0 },
        leftArm: { x: 0.5, y: 0, z: 0.05 },
        rightArm: { x: -0.5, y: 0, z: -0.05 },
        leftLeg: { x: -0.4, y: 0, z: 0 },
        rightLeg: { x: 0.4, y: 0, z: 0 }
      },
      running: {
        head: { x: -0.1, y: 0, z: 0 },
        body: { x: -0.17, y: 0, z: 0 },
        leftArm: { x: 0.9, y: 0, z: 0.1 },
        rightArm: { x: -0.9, y: 0, z: -0.1 },
        leftLeg: { x: -0.7, y: 0, z: 0 },
        rightLeg: { x: 0.7, y: 0, z: 0 }
      },
      waving: {
        head: { x: 0, y: 0.26, z: 0.1 },
        body: { x: 0, y: 0, z: 0 },
        leftArm: { x: 0, y: 0, z: 0.05 },
        rightArm: { x: -2.1, y: 0.35, z: -0.35 },
        leftLeg: { x: 0, y: 0, z: 0 },
        rightLeg: { x: 0, y: 0, z: 0 }
      },
      sitting: {
        head: { x: 0.1, y: 0, z: 0 },
        body: { x: 0, y: 0, z: 0 },
        leftArm: { x: -0.8, y: 0, z: 0.17 },
        rightArm: { x: -0.8, y: 0, z: -0.17 },
        leftLeg: { x: -1.57, y: 0, z: 0 },
        rightLeg: { x: -1.57, y: 0, z: 0 }
      },
      pointing: {
        head: { x: -0.1, y: -0.17, z: 0 },
        body: { x: 0, y: -0.1, z: 0 },
        leftArm: { x: 0, y: 0, z: 0.1 },
        rightArm: { x: -1.57, y: -0.17, z: 0 },
        leftLeg: { x: 0, y: 0, z: 0 },
        rightLeg: { x: 0, y: 0, z: 0 }
      },
      crossed_arms: {
        head: { x: 0.1, y: 0, z: 0 },
        body: { x: 0, y: 0, z: 0 },
        leftArm: { x: -0.9, y: 0, z: 0.9 },
        rightArm: { x: -0.9, y: 0, z: -0.9 },
        leftLeg: { x: 0, y: 0, z: 0 },
        rightLeg: { x: 0, y: 0, z: 0 }
      }
    };
    const props = __props;
    const canvasRef = ref2(null);
    const isLoading = ref2(true);
    const imgError = ref2(false);
    let viewer = null;
    const altText = computed2(
      () => props.mcid ? `${props.mcid}'s Minecraft avatar` : "Minecraft avatar"
    );
    const imageUrl = computed2(
      () => `${props.apiEndpoint}?uuid=${props.uuid}&width=${props.width}&height=${props.height}&pose=${props.pose}&angle=${props.angle}&elevation=${props.elevation}&zoom=${props.zoom}`
    );
    const fallbackUrl = computed2(
      () => `${props.apiEndpoint}?uuid=${STEVE_UUID2}&width=${props.width}&height=${props.height}&pose=${props.pose}&angle=${props.angle}&elevation=${props.elevation}&zoom=${props.zoom}`
    );
    function handleLoad() {
      isLoading.value = false;
    }
    function handleError() {
      imgError.value = true;
      isLoading.value = false;
    }
    async function initViewer() {
      const canvas = canvasRef.value;
      if (!canvas) return;
      try {
        const skinview3d = await import("skinview3d");
        if (viewer) {
          viewer.dispose();
        }
        viewer = new skinview3d.SkinViewer({
          canvas,
          width: props.width,
          height: props.height,
          zoom: props.zoom,
          background: props.background || void 0
        });
        const skinUrl = `https://crafatar.com/skins/${props.uuid}`;
        try {
          await viewer.loadSkin(skinUrl);
        } catch {
          const steveUrl = `https://crafatar.com/skins/${STEVE_UUID2}`;
          await viewer.loadSkin(steveUrl);
        }
        const angleRad = props.angle * Math.PI / 180;
        const elevationRad = props.elevation * Math.PI / 180;
        viewer.camera.rotation.x = elevationRad;
        viewer.camera.rotation.y = angleRad;
        if (props.walk && !props.run) {
          viewer.animation = new skinview3d.WalkingAnimation();
        } else if (props.run) {
          viewer.animation = new skinview3d.RunningAnimation();
        } else if (props.pose !== "custom") {
          const poseRotations = POSE_ROTATIONS[props.pose];
          if (poseRotations && viewer.playerObject?.skin) {
            const skin = viewer.playerObject.skin;
            skin.head.rotation.x = poseRotations.head.x;
            skin.head.rotation.y = poseRotations.head.y;
            skin.head.rotation.z = poseRotations.head.z;
            skin.body.rotation.x = poseRotations.body.x;
            skin.body.rotation.y = poseRotations.body.y;
            skin.body.rotation.z = poseRotations.body.z;
            skin.leftArm.rotation.x = poseRotations.leftArm.x;
            skin.leftArm.rotation.y = poseRotations.leftArm.y;
            skin.leftArm.rotation.z = poseRotations.leftArm.z;
            skin.rightArm.rotation.x = poseRotations.rightArm.x;
            skin.rightArm.rotation.y = poseRotations.rightArm.y;
            skin.rightArm.rotation.z = poseRotations.rightArm.z;
            skin.leftLeg.rotation.x = poseRotations.leftLeg.x;
            skin.leftLeg.rotation.y = poseRotations.leftLeg.y;
            skin.leftLeg.rotation.z = poseRotations.leftLeg.z;
            skin.rightLeg.rotation.x = poseRotations.rightLeg.x;
            skin.rightLeg.rotation.y = poseRotations.rightLeg.y;
            skin.rightLeg.rotation.z = poseRotations.rightLeg.z;
          }
        }
        if (props.rotate) {
          viewer.autoRotate = true;
          viewer.autoRotateSpeed = 1;
        }
        viewer.render();
      } catch (error) {
        console.error("Failed to initialize skinview3d:", error);
      }
    }
    onMounted2(() => {
      if (!props.apiEndpoint) {
        initViewer();
      }
    });
    onUnmounted(() => {
      if (viewer) {
        viewer.dispose();
        viewer = null;
      }
    });
    watch2(
      () => [
        props.uuid,
        props.width,
        props.height,
        props.pose,
        props.angle,
        props.elevation,
        props.zoom,
        props.background,
        props.walk,
        props.run,
        props.rotate
      ],
      () => {
        if (!props.apiEndpoint) {
          initViewer();
        } else {
          imgError.value = false;
          isLoading.value = true;
        }
      }
    );
    return (_ctx, _cache) => {
      return _openBlock2(), _createElementBlock2(
        _Fragment2,
        null,
        [
          _createCommentVNode2(" Server-side rendering mode "),
          __props.apiEndpoint ? (_openBlock2(), _createElementBlock2(
            "div",
            {
              key: 0,
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
                loading: "lazy",
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
          )) : (_openBlock2(), _createElementBlock2(
            _Fragment2,
            { key: 1 },
            [
              _createCommentVNode2(" Client-side rendering mode (skinview3d) "),
              _createElementVNode2("canvas", {
                ref_key: "canvasRef",
                ref: canvasRef,
                class: _normalizeClass2(__props.className),
                style: _normalizeStyle2({
                  width: `${__props.width}px`,
                  height: `${__props.height}px`
                }),
                "aria-label": altText.value
              }, null, 14, _hoisted_22)
            ],
            2112
            /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
          ))
        ],
        2112
        /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
      );
    };
  }
});
export {
  MinecraftAvatar_default as MinecraftAvatar,
  MinecraftFullBody_default as MinecraftFullBody
};
//# sourceMappingURL=vue.js.map