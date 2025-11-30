import { defineConfig } from 'tsup';

// Vue SFC esbuild plugin
const vueSfcPlugin = {
  name: 'vue-sfc',
  setup(build: import('esbuild').PluginBuild) {
    build.onLoad({ filter: /\.vue$/ }, async (args) => {
      const { readFileSync } = await import('fs');
      const { compileScript, parse } = await import('vue/compiler-sfc');

      const source = readFileSync(args.path, 'utf-8');
      const { descriptor } = parse(source);

      const scriptBlock = descriptor.scriptSetup || descriptor.script;
      if (!scriptBlock) {
        return { contents: 'export default {}', loader: 'ts' as const };
      }

      const compiled = compileScript(descriptor, {
        id: args.path,
        inlineTemplate: true,
      });

      return {
        contents: compiled.content,
        loader: (scriptBlock.lang === 'ts' ? 'ts' : 'js') as 'ts' | 'js',
      };
    });
  },
};

export default defineConfig([
  // Core and React builds
  {
    entry: {
      index: 'src/core/index.ts',
      react: 'src/react/index.ts',
    },
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    external: ['react', 'react-dom', 'vue', 'sharp'],
    onSuccess: async () => {
      const { existsSync, copyFileSync, mkdirSync } = await import('fs');
      const { join } = await import('path');

      // Copy Vue type declarations
      const vueDts = join('src', 'vue', 'vue.d.ts');
      const distDir = join('dist');

      if (existsSync(vueDts)) {
        copyFileSync(vueDts, join(distDir, 'vue.d.ts'));
        copyFileSync(vueDts, join(distDir, 'vue.d.cts'));
        console.log('Vue type declarations copied');
      }
    },
  },
  // Vue build (separate to handle .vue files)
  {
    entry: {
      vue: 'src/vue/index.ts',
    },
    format: ['cjs', 'esm'],
    dts: false,
    splitting: false,
    sourcemap: true,
    clean: false,
    external: ['react', 'react-dom', 'vue', 'sharp'],
    esbuildPlugins: [vueSfcPlugin],
  },
]);
