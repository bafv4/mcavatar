# @bafv4/mcavatar

Minecraft avatar generation library with 3D full-body support for Node.js, React, and Vue applications.

## Features

- **Face Avatar**: Generate 2D face avatars from Minecraft skins
- **3D Full Body**: Render 3D full-body avatars using skinview3d
- **Multiple Poses**: Standing, walking, running, waving, sitting, pointing, crossed arms
- **Custom Poses**: Define your own pose configurations
- **High-DPI Support**: Scale option for Retina displays
- **React/Vue Components**: Ready-to-use components for frontend frameworks
- **Auto Skin Detection**: Automatically detects slim (Alex) vs classic (Steve) arm models

## Installation

### From GitHub

```bash
# npm
npm install github:bafv4/mcavatar

# pnpm
pnpm add github:bafv4/mcavatar

# yarn
yarn add github:bafv4/mcavatar
```

Or specify in `package.json`:

```json
{
  "dependencies": {
    "@bafv4/mcavatar": "github:bafv4/mcavatar"
  }
}
```

To install a specific branch or tag:

```bash
# Specific branch
pnpm add github:bafv4/mcavatar#main

# Specific tag/release
pnpm add github:bafv4/mcavatar#v1.1.0

# Specific commit
pnpm add github:bafv4/mcavatar#abc1234
```

### Peer Dependencies

Install required peer dependencies:

```bash
# For face avatar only (generateAvatar)
pnpm add sharp @napi-rs/canvas

# For 3D full body (generateFullBody) - also requires puppeteer
pnpm add sharp @napi-rs/canvas puppeteer
```

| Package | Required | Description |
|---------|----------|-------------|
| `sharp` | Yes | Image processing |
| `@napi-rs/canvas` | Yes | Canvas rendering |
| `puppeteer` | 3D only | Headless browser for 3D rendering |
| `react` | Optional | For React components |
| `vue` | Optional | For Vue components |

> **Note**: If you only need face avatars (`generateAvatar`), you don't need to install `puppeteer`.

## Usage

### Face Avatar

```typescript
import { generateAvatar } from '@bafv4/mcavatar';

const result = await generateAvatar('player-uuid-here', {
  size: 64,              // Output size in pixels (default: 64)
  includeOverlay: true,  // Include hat/overlay layer (default: true)
});

// result.data is a Buffer containing PNG image
```

### 3D Full Body

```typescript
import { generateFullBody, closeBrowser } from '@bafv4/mcavatar';

const result = await generateFullBody('player-uuid-here', {
  width: 300,           // Output width (default: 300)
  height: 400,          // Output height (default: 400)
  scale: 2,             // Pixel density for Retina (default: 1)
  pose: 'standing',     // Pose name (default: 'standing')
  view: {
    angle: 25,          // Camera angle in degrees (default: 0)
    elevation: 10,      // Camera elevation (default: 0)
    zoom: 1.0,          // Zoom level (default: 1.0)
  },
  includeOverlay: true, // Include overlay layers (default: true)
  background: null,     // Background color or null for transparent
});

// Important: Close browser when done to free resources
await closeBrowser();
```

### Available Poses

| Pose Name | Description |
|-----------|-------------|
| `standing` | Default neutral stance |
| `walking` | Mid-stride walking position |
| `running` | Extended running stride |
| `waving` | Right arm raised waving |
| `sitting` | Seated position |
| `pointing` | Right arm extended forward |
| `crossed_arms` | Arms crossed over chest |

### Custom Poses

```typescript
import { generateFullBody, createCustomPose } from '@bafv4/mcavatar';

const customPose = createCustomPose(
  { rotation: { pitch: -10, yaw: 15, roll: 0 } },  // head
  { rotation: { pitch: 0, yaw: 0, roll: 0 } },     // torso
  { rotation: { pitch: 45, yaw: 0, roll: 5 } },    // leftArm
  { rotation: { pitch: -30, yaw: 0, roll: -5 } },  // rightArm
  { rotation: { pitch: 0, yaw: 0, roll: 0 } },     // leftLeg
  { rotation: { pitch: 0, yaw: 0, roll: 0 } },     // rightLeg
);

const result = await generateFullBody('player-uuid', {
  pose: customPose,
});
```

### High-DPI / Retina Support

```typescript
// Normal resolution (300x400 pixels)
const normal = await generateFullBody('uuid', {
  width: 300,
  height: 400,
  scale: 1,
});

// Retina resolution (600x800 pixels at 2x density)
const retina = await generateFullBody('uuid', {
  width: 300,
  height: 400,
  scale: 2,
});
```

## React Component

```tsx
import { MinecraftAvatar } from '@bafv4/mcavatar/react';

// Face avatar
<MinecraftAvatar
  uuid="player-uuid"
  mcid="PlayerName"
  size={64}
  className="avatar"
  apiEndpoint="/api/avatar"
/>
```

```tsx
import { MinecraftFullBody } from '@bafv4/mcavatar/react';

// Full body
<MinecraftFullBody
  uuid="player-uuid"
  mcid="PlayerName"
  width={300}
  height={400}
  pose="waving"
  angle={25}
  apiEndpoint="/api/fullbody"
/>
```

## Vue Component

```vue
<script setup>
import { MinecraftAvatar } from '@bafv4/mcavatar/vue';
</script>

<template>
  <MinecraftAvatar
    uuid="player-uuid"
    mcid="PlayerName"
    :size="64"
    api-endpoint="/api/avatar"
  />
</template>
```

```vue
<script setup>
import { MinecraftFullBody } from '@bafv4/mcavatar/vue';
</script>

<template>
  <MinecraftFullBody
    uuid="player-uuid"
    mcid="PlayerName"
    :width="300"
    :height="400"
    pose="waving"
    :angle="25"
    api-endpoint="/api/fullbody"
  />
</template>
```

## API Reference

### `generateAvatar(uuid, options?)`

Generate a 2D face avatar.

**Options:**
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `size` | `number` | `64` | Output size in pixels |
| `includeOverlay` | `boolean` | `true` | Include hat/overlay layer |
| `fallbackUuid` | `string` | Steve UUID | Fallback if skin fetch fails |

**Returns:** `Promise<AvatarResult>`

### `generateFullBody(uuid, options?)`

Generate a 3D full-body avatar.

**Options:**
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `width` | `number` | `300` | Output width in pixels |
| `height` | `number` | `400` | Output height in pixels |
| `scale` | `number` | `1` | Pixel density (2 for Retina) |
| `pose` | `PoseName \| PoseDefinition` | `'standing'` | Pose to render |
| `view.angle` | `number` | `0` | Camera rotation (degrees) |
| `view.elevation` | `number` | `0` | Camera elevation (degrees) |
| `view.zoom` | `number` | `1.0` | Zoom level |
| `includeOverlay` | `boolean` | `true` | Include overlay layers |
| `armModel` | `'classic' \| 'slim'` | auto | Arm model override |
| `background` | `string \| null` | `null` | Background color |
| `fallbackUuid` | `string` | Steve UUID | Fallback if skin fetch fails |

**Returns:** `Promise<FullBodyResult>`

### `closeBrowser()`

Close the Puppeteer browser instance. Call this when your application shuts down to free resources.

```typescript
await closeBrowser();
```

### Pose Utilities

```typescript
import {
  getPose,           // Get pose definition by name
  validatePose,      // Validate custom pose
  createCustomPose,  // Create custom pose from parts
  interpolatePoses,  // Interpolate between poses (for animation)
  POSES,             // All predefined poses
} from '@bafv4/mcavatar';
```

## Result Types

### AvatarResult

```typescript
interface AvatarResult {
  data: Buffer;              // PNG image data
  contentType: 'image/png';
  usedFallback: boolean;
  skinFormat: 'legacy' | 'modern';
  hasOverlay: boolean;
}
```

### FullBodyResult

```typescript
interface FullBodyResult {
  data: Buffer;              // PNG image data
  contentType: 'image/png';
  usedFallback: boolean;
  skinFormat: 'legacy' | 'modern';
  armModel: 'classic' | 'slim';
  pose: PoseName;
  hasOverlay: boolean;
}
```

## Server-Side Usage Example

### Next.js API Route

```typescript
// app/api/avatar/route.ts
import { generateAvatar } from '@bafv4/mcavatar';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const uuid = request.nextUrl.searchParams.get('uuid');

  if (!uuid) {
    return NextResponse.json({ error: 'UUID required' }, { status: 400 });
  }

  const result = await generateAvatar(uuid, { size: 64 });

  return new NextResponse(result.data, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
```

```typescript
// app/api/fullbody/route.ts
import { generateFullBody } from '@bafv4/mcavatar';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const uuid = searchParams.get('uuid');
  const pose = searchParams.get('pose') || 'standing';

  if (!uuid) {
    return NextResponse.json({ error: 'UUID required' }, { status: 400 });
  }

  const result = await generateFullBody(uuid, {
    width: 300,
    height: 400,
    pose: pose as any,
    view: { angle: 25, elevation: 10 },
  });

  return new NextResponse(result.data, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
```

## License

MIT
