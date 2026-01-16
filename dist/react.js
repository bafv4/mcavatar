// src/react/MinecraftAvatar.tsx
import { useState, useEffect, memo, useCallback } from "react";

// src/shared/constants.ts
var STEVE_UUID = "8667ba71b85a4004af54457a9734eed7";

// src/react/MinecraftAvatar.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var MinecraftAvatarComponent = ({
  uuid,
  mcid,
  size = 64,
  className = "",
  priority = false,
  apiEndpoint = "/api/avatar"
}) => {
  const [imgError, setImgError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const imageUrl = `${apiEndpoint}?uuid=${uuid}&size=${size}`;
  const fallbackUrl = `${apiEndpoint}?uuid=${STEVE_UUID}&size=${size}`;
  useEffect(() => {
    setImgError(false);
    setIsLoading(true);
  }, [uuid]);
  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);
  const handleError = useCallback(() => {
    setImgError(true);
    setIsLoading(false);
  }, []);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className,
      style: {
        width: size,
        height: size,
        position: "relative"
      },
      children: [
        /* @__PURE__ */ jsx(
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
        isLoading && /* @__PURE__ */ jsx(
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
var MinecraftAvatar = memo(MinecraftAvatarComponent);

// src/react/MinecraftFullBody.tsx
import { useState as useState2, useEffect as useEffect2, memo as memo2, useCallback as useCallback2 } from "react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
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
  const [imgError, setImgError] = useState2(false);
  const [isLoading, setIsLoading] = useState2(true);
  const imageUrl = `${apiEndpoint}?uuid=${uuid}&width=${width}&height=${height}&pose=${pose}&angle=${angle}`;
  const fallbackUrl = `${apiEndpoint}?uuid=${STEVE_UUID}&width=${width}&height=${height}&pose=${pose}&angle=${angle}`;
  useEffect2(() => {
    setImgError(false);
    setIsLoading(true);
  }, [uuid, pose, angle, width, height]);
  const handleLoad = useCallback2(() => {
    setIsLoading(false);
  }, []);
  const handleError = useCallback2(() => {
    setImgError(true);
    setIsLoading(false);
  }, []);
  return /* @__PURE__ */ jsxs2(
    "div",
    {
      className,
      style: {
        width,
        height,
        position: "relative"
      },
      children: [
        /* @__PURE__ */ jsx2(
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
        isLoading && /* @__PURE__ */ jsx2(
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
var MinecraftFullBody = memo2(MinecraftFullBodyComponent);
export {
  MinecraftAvatar,
  MinecraftFullBody
};
//# sourceMappingURL=react.js.map