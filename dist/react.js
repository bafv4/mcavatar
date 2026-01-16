// src/react/MinecraftAvatar.tsx
import { useState, useEffect, useRef, memo, useCallback } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var STEVE_UUID = "8667ba71b85a4004af54457a9734eed7";
var HEAD_BASE = { x: 8, y: 8, width: 8, height: 8 };
var HEAD_OVERLAY = { x: 40, y: 8, width: 8, height: 8 };
var MinecraftAvatarComponent = ({
  uuid,
  mcid,
  size = 64,
  overlay = true,
  className = "",
  apiEndpoint
}) => {
  const [imgSrc, setImgSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const canvasRef = useRef(null);
  if (apiEndpoint) {
    const imageUrl = `${apiEndpoint}?uuid=${uuid}&size=${size}&overlay=${overlay}`;
    const fallbackUrl = `${apiEndpoint}?uuid=${STEVE_UUID}&size=${size}&overlay=${overlay}`;
    const handleLoad = useCallback(() => {
      setIsLoading(false);
    }, []);
    const handleError = useCallback(() => {
      setError(true);
      setIsLoading(false);
    }, []);
    useEffect(() => {
      setError(false);
      setIsLoading(true);
    }, [uuid]);
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
              src: error ? fallbackUrl : imageUrl,
              alt: mcid ? `${mcid}'s avatar` : "Minecraft avatar",
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
              loading: "lazy",
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
  }
  useEffect(() => {
    let cancelled = false;
    const renderAvatar = async () => {
      setIsLoading(true);
      setError(false);
      const skinUrl = `https://crafatar.com/skins/${uuid}`;
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
        if (cancelled) return;
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
        if (overlay) {
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
        outputCanvas.width = size;
        outputCanvas.height = size;
        const outputCtx = outputCanvas.getContext("2d");
        if (!outputCtx) return;
        outputCtx.imageSmoothingEnabled = false;
        outputCtx.drawImage(extractCanvas, 0, 0, size, size);
        const dataUrl = outputCanvas.toDataURL("image/png");
        if (!cancelled) {
          setImgSrc(dataUrl);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Failed to render avatar:", err);
        if (!cancelled) {
          setError(true);
          setIsLoading(false);
        }
      }
    };
    renderAvatar();
    return () => {
      cancelled = true;
    };
  }, [uuid, size, overlay]);
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
        imgSrc && !isLoading && /* @__PURE__ */ jsx(
          "img",
          {
            src: imgSrc,
            alt: mcid ? `${mcid}'s avatar` : "Minecraft avatar",
            width: size,
            height: size,
            style: {
              imageRendering: "pixelated",
              width: size,
              height: size
            }
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
        ),
        error && !isLoading && /* @__PURE__ */ jsx(
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
        ),
        /* @__PURE__ */ jsx("canvas", { ref: canvasRef, style: { display: "none" } })
      ]
    }
  );
};
var MinecraftAvatar = memo(MinecraftAvatarComponent);

// src/react/MinecraftFullBody.tsx
import { useRef as useRef2, useEffect as useEffect2, useState as useState2, memo as memo2, useCallback as useCallback2 } from "react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var STEVE_UUID2 = "8667ba71b85a4004af54457a9734eed7";
var POSE_ROTATIONS = {
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
var MinecraftFullBodyComponent = ({
  uuid,
  mcid,
  width = 300,
  height = 400,
  pose = "standing",
  angle = 25,
  elevation = 10,
  zoom = 0.9,
  className = "",
  background,
  walk = false,
  run = false,
  rotate = false,
  apiEndpoint
}) => {
  const canvasRef = useRef2(null);
  const viewerRef = useRef2(null);
  const [isLoading, setIsLoading] = useState2(true);
  const [error, setError] = useState2(false);
  if (apiEndpoint) {
    const imageUrl = `${apiEndpoint}?uuid=${uuid}&width=${width}&height=${height}&pose=${pose}&angle=${angle}&elevation=${elevation}&zoom=${zoom}`;
    const fallbackUrl = `${apiEndpoint}?uuid=${STEVE_UUID2}&width=${width}&height=${height}&pose=${pose}&angle=${angle}&elevation=${elevation}&zoom=${zoom}`;
    const handleLoad = useCallback2(() => {
      setIsLoading(false);
    }, []);
    const handleError = useCallback2(() => {
      setError(true);
      setIsLoading(false);
    }, []);
    useEffect2(() => {
      setError(false);
      setIsLoading(true);
    }, [uuid, pose, angle, elevation, zoom, width, height]);
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
              src: error ? fallbackUrl : imageUrl,
              alt: mcid ? `${mcid}'s Minecraft avatar` : "Minecraft avatar",
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
              loading: "lazy",
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
  }
  useEffect2(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let disposed = false;
    const initViewer = async () => {
      try {
        const skinview3d = await import("skinview3d");
        if (disposed) return;
        if (viewerRef.current) {
          viewerRef.current.dispose();
        }
        const viewer = new skinview3d.SkinViewer({
          canvas,
          width,
          height,
          zoom,
          background: background || void 0
        });
        viewerRef.current = viewer;
        const skinUrl = `https://crafatar.com/skins/${uuid}`;
        try {
          await viewer.loadSkin(skinUrl);
        } catch {
          const steveUrl = `https://crafatar.com/skins/${STEVE_UUID2}`;
          await viewer.loadSkin(steveUrl);
        }
        const angleRad = angle * Math.PI / 180;
        const elevationRad = elevation * Math.PI / 180;
        viewer.camera.rotation.x = elevationRad;
        viewer.camera.rotation.y = angleRad;
        if (walk && !run) {
          viewer.animation = new skinview3d.WalkingAnimation();
        } else if (run) {
          viewer.animation = new skinview3d.RunningAnimation();
        } else if (pose !== "custom") {
          const poseRotations = POSE_ROTATIONS[pose];
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
        if (rotate) {
          viewer.autoRotate = true;
          viewer.autoRotateSpeed = 1;
        }
        viewer.render();
      } catch (error2) {
        console.error("Failed to initialize skinview3d:", error2);
      }
    };
    initViewer();
    return () => {
      disposed = true;
      if (viewerRef.current) {
        viewerRef.current.dispose();
        viewerRef.current = null;
      }
    };
  }, [uuid, width, height, pose, angle, elevation, zoom, background, walk, run, rotate]);
  return /* @__PURE__ */ jsx2(
    "canvas",
    {
      ref: canvasRef,
      className,
      style: {
        width,
        height
      },
      "aria-label": mcid ? `${mcid}'s Minecraft avatar` : "Minecraft avatar"
    }
  );
};
var MinecraftFullBody = memo2(MinecraftFullBodyComponent);
export {
  MinecraftAvatar,
  MinecraftFullBody
};
//# sourceMappingURL=react.js.map