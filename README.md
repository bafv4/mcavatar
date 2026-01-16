# @bafv4/mcavatar

Minecraft avatar generation library with 3D full-body support for React and Vue applications.

## Features

- **Face Avatar**: 2D face avatars (client-side Canvas or server-side Sharp)
- **3D Full Body**: 3D full-body avatars using skinview3d (client-side) or API (server-side)
- **Multiple Poses**: Standing, walking, running, waving, sitting, pointing, crossed arms
- **Animations**: Built-in walking, running, and rotation animations (client-side)
- **React/Vue Components**: Ready-to-use components for frontend frameworks
- **Dual Rendering**: Both client-side and server-side rendering support

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

### Peer Dependencies

Install based on your use case:

```bash
# For client-side rendering only (no additional deps needed for face avatar)
# For 3D full body client-side
pnpm add skinview3d three

# For server-side rendering (API routes)
pnpm add sharp @napi-rs/canvas
```

| Package | Required For | Description |
|---------|--------------|-------------|
| `skinview3d` | 3D Full body (client) | WebGL-based Minecraft skin viewer |
| `three` | 3D Full body (client) | 3D rendering engine |
| `sharp` | Server-side API | Image processing |
| `@napi-rs/canvas` | Server-side API | Canvas rendering |

## Usage

### Rendering Modes

All components support two rendering modes:

1. **Client-side (default)**: Renders directly in the browser
   - Face avatar: Uses Canvas API
   - Full body: Uses skinview3d (WebGL)

2. **Server-side**: Fetches from your API endpoint
   - Add `apiEndpoint` prop to use server-side rendering

## React Components

### Face Avatar

```tsx
import { MinecraftAvatar } from '@bafv4/mcavatar/react';

// Client-side rendering (default)
<MinecraftAvatar
  uuid="player-uuid"
  size={64}
/>

// Server-side rendering
<MinecraftAvatar
  uuid="player-uuid"
  size={64}
  apiEndpoint="/api/avatar"
/>
```

#### Face Avatar Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `uuid` | `string` | required | Player UUID |
| `mcid` | `string` | - | Player name for alt text |
| `size` | `number` | `64` | Output size in pixels |
| `overlay` | `boolean` | `true` | Include hat/overlay layer |
| `className` | `string` | - | CSS class name |
| `apiEndpoint` | `string` | - | API endpoint for server-side rendering |

### 3D Full Body

```tsx
import { MinecraftFullBody } from '@bafv4/mcavatar/react';

// Client-side rendering (default, requires skinview3d)
<MinecraftFullBody
  uuid="player-uuid"
  width={300}
  height={400}
  pose="waving"
  angle={30}
/>

// With animation (client-side only)
<MinecraftFullBody
  uuid="player-uuid"
  walk={true}
  rotate={true}
/>

// Server-side rendering
<MinecraftFullBody
  uuid="player-uuid"
  apiEndpoint="/api/fullbody"
/>
```

#### Full Body Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `uuid` | `string` | required | Player UUID |
| `mcid` | `string` | - | Player name for alt text |
| `width` | `number` | `300` | Canvas width in pixels |
| `height` | `number` | `400` | Canvas height in pixels |
| `pose` | `PoseName` | `'standing'` | Pose name |
| `angle` | `number` | `25` | Camera rotation angle (degrees) |
| `elevation` | `number` | `10` | Camera elevation angle (degrees) |
| `zoom` | `number` | `0.9` | Zoom level |
| `className` | `string` | - | CSS class name |
| `background` | `string` | transparent | Background color |
| `walk` | `boolean` | `false` | Enable walking animation (client-side only) |
| `run` | `boolean` | `false` | Enable running animation (client-side only) |
| `rotate` | `boolean` | `false` | Enable auto-rotation (client-side only) |
| `apiEndpoint` | `string` | - | API endpoint for server-side rendering |

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

## Vue Components

### Face Avatar

```vue
<script setup>
import { MinecraftAvatar } from '@bafv4/mcavatar/vue';
</script>

<template>
  <!-- Client-side rendering -->
  <MinecraftAvatar uuid="player-uuid" :size="64" />

  <!-- Server-side rendering -->
  <MinecraftAvatar uuid="player-uuid" api-endpoint="/api/avatar" />
</template>
```

### 3D Full Body

```vue
<script setup>
import { MinecraftFullBody } from '@bafv4/mcavatar/vue';
</script>

<template>
  <!-- Client-side rendering -->
  <MinecraftFullBody
    uuid="player-uuid"
    :width="300"
    :height="400"
    pose="waving"
  />

  <!-- Server-side rendering -->
  <MinecraftFullBody
    uuid="player-uuid"
    api-endpoint="/api/fullbody"
  />
</template>
```

## Server-Side API (Optional)

If you need server-side rendering, create API routes:

### Face Avatar API

```typescript
// app/api/avatar/route.ts (Next.js)
import { generateAvatar } from '@bafv4/mcavatar';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const uuid = request.nextUrl.searchParams.get('uuid');
  const size = parseInt(request.nextUrl.searchParams.get('size') || '64');
  const overlay = request.nextUrl.searchParams.get('overlay') !== 'false';

  if (!uuid) {
    return NextResponse.json({ error: 'UUID required' }, { status: 400 });
  }

  const result = await generateAvatar(uuid, { size, includeOverlay: overlay });

  return new NextResponse(result.data, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
```

### `generateAvatar(uuid, options?)`

Server-side function to generate face avatars.

**Options:**
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `size` | `number` | `64` | Output size in pixels |
| `includeOverlay` | `boolean` | `true` | Include hat/overlay layer |
| `fallbackUuid` | `string` | Steve UUID | Fallback if skin fetch fails |

**Returns:** `Promise<AvatarResult>`

```typescript
interface AvatarResult {
  data: Buffer;              // PNG image data
  contentType: 'image/png';
  usedFallback: boolean;
  skinFormat: 'legacy' | 'modern';
  hasOverlay: boolean;
}
```

## License

MIT
