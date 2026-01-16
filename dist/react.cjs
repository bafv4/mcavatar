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

// src/react/index.ts
var react_exports = {};
__export(react_exports, {
  MinecraftAvatar: () => MinecraftAvatar,
  MinecraftFullBody: () => MinecraftFullBody
});
module.exports = __toCommonJS(react_exports);

// src/react/MinecraftAvatar.tsx
var import_react = require("react");

// src/shared/constants.ts
var STEVE_UUID = "8667ba71b85a4004af54457a9734eed7";

// src/react/MinecraftAvatar.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var MinecraftAvatarComponent = ({
  uuid,
  mcid,
  size = 64,
  className = "",
  priority = false,
  apiEndpoint = "/api/avatar"
}) => {
  const [imgError, setImgError] = (0, import_react.useState)(false);
  const [isLoading, setIsLoading] = (0, import_react.useState)(true);
  const imageUrl = `${apiEndpoint}?uuid=${uuid}&size=${size}`;
  const fallbackUrl = `${apiEndpoint}?uuid=${STEVE_UUID}&size=${size}`;
  (0, import_react.useEffect)(() => {
    setImgError(false);
    setIsLoading(true);
  }, [uuid]);
  const handleLoad = (0, import_react.useCallback)(() => {
    setIsLoading(false);
  }, []);
  const handleError = (0, import_react.useCallback)(() => {
    setImgError(true);
    setIsLoading(false);
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      className,
      style: {
        width: size,
        height: size,
        position: "relative"
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "img",
          {
            src: imgError ? fallbackUrl : imageUrl,
            alt: mcid ? `${mcid} \u306E\u30B9\u30AD\u30F3` : "Minecraft avatar",
            width: size,
            height: size,
            style: {
              imageRendering: "pixelated",
              display: isLoading ? "none" : "block",
              width: size,
              height: size
            },
            onLoad: handleLoad,
            onError: handleError,
            loading: priority ? "eager" : "lazy",
            decoding: "async"
          }
        ),
        isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            style: {
              width: size,
              height: size,
              backgroundColor: "#3c3c3c",
              position: "absolute",
              top: 0,
              left: 0
            }
          }
        )
      ]
    }
  );
};
var MinecraftAvatar = (0, import_react.memo)(MinecraftAvatarComponent);

// src/react/MinecraftFullBody.tsx
var import_react2 = require("react");
var import_jsx_runtime2 = require("react/jsx-runtime");
var MinecraftFullBodyComponent = ({
  uuid,
  mcid,
  width = 128,
  height = 256,
  pose = "standing",
  angle = 25,
  className = "",
  priority = false,
  apiEndpoint = "/api/fullbody"
}) => {
  const [imgError, setImgError] = (0, import_react2.useState)(false);
  const [isLoading, setIsLoading] = (0, import_react2.useState)(true);
  const imageUrl = `${apiEndpoint}?uuid=${uuid}&width=${width}&height=${height}&pose=${pose}&angle=${angle}`;
  const fallbackUrl = `${apiEndpoint}?uuid=${STEVE_UUID}&width=${width}&height=${height}&pose=${pose}&angle=${angle}`;
  (0, import_react2.useEffect)(() => {
    setImgError(false);
    setIsLoading(true);
  }, [uuid, pose, angle, width, height]);
  const handleLoad = (0, import_react2.useCallback)(() => {
    setIsLoading(false);
  }, []);
  const handleError = (0, import_react2.useCallback)(() => {
    setImgError(true);
    setIsLoading(false);
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
    "div",
    {
      className,
      style: {
        width,
        height,
        position: "relative"
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "img",
          {
            src: imgError ? fallbackUrl : imageUrl,
            alt: mcid ? `${mcid} \u306E\u30D5\u30EB\u30DC\u30C7\u30A3` : "Minecraft full body avatar",
            width,
            height,
            style: {
              imageRendering: "pixelated",
              display: isLoading ? "none" : "block",
              width,
              height
            },
            onLoad: handleLoad,
            onError: handleError,
            loading: priority ? "eager" : "lazy",
            decoding: "async"
          }
        ),
        isLoading && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "div",
          {
            style: {
              width,
              height,
              backgroundColor: "#3c3c3c",
              position: "absolute",
              top: 0,
              left: 0
            }
          }
        )
      ]
    }
  );
};
var MinecraftFullBody = (0, import_react2.memo)(MinecraftFullBodyComponent);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MinecraftAvatar,
  MinecraftFullBody
});
//# sourceMappingURL=react.cjs.map