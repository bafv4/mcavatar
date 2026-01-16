/**
 * 3D Full Body Renderer using skinview3d + Puppeteer
 * Renders Minecraft character models with accurate proportions via headless browser
 */

import type {
  FullBodyOptions,
  FullBodyResult,
  PoseDefinition,
  PoseName,
  ViewConfig,
} from '../shared/types';
import { DEFAULT_FULLBODY_OPTIONS, DEFAULT_VIEW } from '../shared/constants';
import { detectSkinFormat } from './skin-parser';
import { getPose, POSE_STANDING } from '../3d/poses';
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

// Puppeteer types
type Browser = import('puppeteer').Browser;
type Page = import('puppeteer').Page;

// Singleton browser instance for performance
let browserInstance: Browser | null = null;
let browserInitPromise: Promise<Browser> | null = null;

/**
 * Get or create the browser instance
 */
async function getBrowser(): Promise<Browser> {
  if (browserInstance) {
    return browserInstance;
  }

  if (browserInitPromise) {
    return browserInitPromise;
  }

  browserInitPromise = (async () => {
    const puppeteer = await import('puppeteer');
    browserInstance = await puppeteer.default.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--use-gl=angle',
        '--use-angle=swiftshader',
      ],
    });
    return browserInstance;
  })();

  return browserInitPromise;
}

/**
 * Close the browser instance (call when shutting down)
 */
export async function closeBrowser(): Promise<void> {
  if (browserInstance) {
    await browserInstance.close();
    browserInstance = null;
    browserInitPromise = null;
  }
}

/**
 * Convert pose to skinview3d animation format
 */
function poseToSkinview3dAngles(pose: PoseDefinition): {
  head: { yaw: number; pitch: number };
  leftArm: { pitch: number };
  rightArm: { pitch: number };
  leftLeg: { pitch: number };
  rightLeg: { pitch: number };
} {
  return {
    head: {
      yaw: pose.head?.rotation?.yaw ?? 0,
      pitch: pose.head?.rotation?.pitch ?? 0,
    },
    leftArm: {
      pitch: pose.leftArm?.rotation?.pitch ?? 0,
    },
    rightArm: {
      pitch: pose.rightArm?.rotation?.pitch ?? 0,
    },
    leftLeg: {
      pitch: pose.leftLeg?.rotation?.pitch ?? 0,
    },
    rightLeg: {
      pitch: pose.rightLeg?.rotation?.pitch ?? 0,
    },
  };
}

/**
 * Generate HTML page that renders skin using skinview3d
 */
function generateRenderPage(
  skinDataUrl: string,
  width: number,
  height: number,
  view: ViewConfig,
  pose: PoseDefinition,
  background: string | null
): string {
  const angles = poseToSkinview3dAngles(pose);
  const bgColor = background || 'transparent';

  // Convert degrees to radians
  const angleRad = (view.angle * Math.PI) / 180;
  const elevationRad = (view.elevation * Math.PI) / 180;

  // Calculate camera distance based on canvas size
  // Minecraft character is ~32 units tall
  // skinview3d uses perspective camera with default FOV (~50deg)
  // Smaller distance = larger character on screen
  // baseDistance 42 shows full body with minimal padding
  const baseDistance = 42;
  const sizeScale = 400 / height;
  const distance = (baseDistance * sizeScale) / view.zoom;

  const cameraX = distance * Math.sin(angleRad) * Math.cos(elevationRad);
  // Add slight upward offset to center character in frame
  const cameraY = distance * Math.sin(elevationRad) + 2;
  const cameraZ = distance * Math.cos(angleRad) * Math.cos(elevationRad);

  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; padding: 0; }
    body {
      width: ${width}px;
      height: ${height}px;
      overflow: hidden;
      background: ${bgColor};
    }
    #skin-container {
      width: ${width}px;
      height: ${height}px;
    }
  </style>
</head>
<body>
  <div id="skin-container"></div>
  <script type="module">
    import { SkinViewer } from 'https://esm.sh/skinview3d@3.4.1';

    const container = document.getElementById('skin-container');

    const viewer = new SkinViewer({
      canvas: document.createElement('canvas'),
      width: ${width},
      height: ${height},
      skin: '${skinDataUrl}',
      preserveDrawingBuffer: true,
    });

    // Position camera using spherical coordinates
    viewer.camera.position.set(${cameraX}, ${cameraY}, ${cameraZ});
    viewer.camera.lookAt(0, 0, 0);

    // Apply pose rotations (in radians)
    const pose = {
      head: { yaw: ${(angles.head.yaw * Math.PI) / 180}, pitch: ${(angles.head.pitch * Math.PI) / 180} },
      leftArm: { pitch: ${(angles.leftArm.pitch * Math.PI) / 180} },
      rightArm: { pitch: ${(angles.rightArm.pitch * Math.PI) / 180} },
      leftLeg: { pitch: ${(angles.leftLeg.pitch * Math.PI) / 180} },
      rightLeg: { pitch: ${(angles.rightLeg.pitch * Math.PI) / 180} },
    };

    // Wait for skin to load before applying pose
    viewer.loadSkin('${skinDataUrl}').then(() => {
      // Apply pose
      if (viewer.playerObject && viewer.playerObject.skin) {
        const skin = viewer.playerObject.skin;

        // Head rotation
        skin.head.rotation.y = pose.head.yaw;
        skin.head.rotation.x = pose.head.pitch;

        // Arms: skinview3d uses Z for roll (bring arms down)
        // Default pose has arms horizontal, we need to rotate them down
        // Z rotation brings arms towards body
        skin.leftArm.rotation.x = pose.leftArm.pitch;
        skin.leftArm.rotation.z = ${(angles.leftArm.pitch === 0 ? 0.1 : 0)}; // slight down
        skin.rightArm.rotation.x = pose.rightArm.pitch;
        skin.rightArm.rotation.z = ${(angles.rightArm.pitch === 0 ? -0.1 : 0)}; // slight down

        // Legs
        skin.leftLeg.rotation.x = pose.leftLeg.pitch;
        skin.rightLeg.rotation.x = pose.rightLeg.pitch;
      }

      // Render
      viewer.render();
      container.appendChild(viewer.canvas);
      window.renderComplete = true;
    }).catch(err => {
      console.error('Failed to load skin:', err);
      window.renderComplete = true;
    });
  </script>
</body>
</html>`;
}

/**
 * Render a 3D full body avatar using skinview3d via Puppeteer
 */
export async function renderFullBodySkinview3d(
  skinBuffer: Buffer,
  options: FullBodyOptions = {}
): Promise<FullBodyResult> {
  const sharp = (await import('sharp')).default;

  // Get skin metadata
  const skinImage = sharp(skinBuffer);
  const metadata = await skinImage.metadata();

  if (!metadata.width || !metadata.height) {
    throw new Error('Invalid skin texture: unable to read dimensions');
  }

  const skinFormat = detectSkinFormat(metadata.width, metadata.height);

  // Merge options with defaults
  const opts = {
    width: options.width ?? DEFAULT_FULLBODY_OPTIONS.width,
    height: options.height ?? DEFAULT_FULLBODY_OPTIONS.height,
    scale: options.scale ?? 1,
    includeOverlay: options.includeOverlay ?? DEFAULT_FULLBODY_OPTIONS.includeOverlay,
    view: { ...DEFAULT_VIEW, ...options.view } as ViewConfig,
    background: options.background ?? DEFAULT_FULLBODY_OPTIONS.background,
  };

  // Get pose
  let pose: PoseDefinition;
  let poseName: PoseName;

  if (typeof options.pose === 'string') {
    pose = getPose(options.pose) ?? POSE_STANDING;
    poseName = options.pose;
  } else if (options.pose && typeof options.pose === 'object') {
    pose = options.pose;
    poseName = 'custom';
  } else {
    pose = POSE_STANDING;
    poseName = 'standing';
  }

  // Convert skin to data URL
  const skinBase64 = skinBuffer.toString('base64');
  const skinDataUrl = `data:image/png;base64,${skinBase64}`;

  // Generate HTML
  const html = generateRenderPage(
    skinDataUrl,
    opts.width,
    opts.height,
    opts.view,
    pose,
    opts.background
  );

  // Create temp HTML file
  const tempDir = os.tmpdir();
  const tempFile = path.join(tempDir, `mcavatar-${Date.now()}.html`);
  fs.writeFileSync(tempFile, html);

  try {
    const browser = await getBrowser();
    const page = await browser.newPage();

    await page.setViewport({
      width: opts.width,
      height: opts.height,
      deviceScaleFactor: opts.scale,
    });

    // Load the page
    await page.goto(`file://${tempFile}`, {
      waitUntil: 'networkidle0',
    });

    // Wait for rendering to complete
    await page.waitForFunction('window.renderComplete === true', {
      timeout: 10000,
    });

    // Wait a bit for WebGL to finish
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Take screenshot
    const screenshot = await page.screenshot({
      type: 'png',
      omitBackground: !opts.background,
    });

    await page.close();

    // Process with sharp
    const processedBuffer = await sharp(screenshot)
      .png()
      .toBuffer();

    return {
      data: processedBuffer,
      contentType: 'image/png' as const,
      usedFallback: false,
      skinFormat: skinFormat,
      armModel: options.armModel ?? 'classic',
      hasOverlay: opts.includeOverlay,
      pose: poseName,
    };
  } finally {
    // Clean up temp file
    try {
      fs.unlinkSync(tempFile);
    } catch {
      // Ignore cleanup errors
    }
  }
}
