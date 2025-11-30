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
export {
  MinecraftAvatar
};
//# sourceMappingURL=react.js.map