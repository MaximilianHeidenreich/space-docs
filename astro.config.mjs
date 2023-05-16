import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), mdx()], // preact(), react()
  site: 'https://deta.space',
  base: '/',
  vite: {
    build: {
      rollupOptions: {
        external: process.env.PUBLIC_TELETYPE_INSTALLED === 'true' ? [] : ['@deta/teletype/src/index'],
        output: {
          assetFileNames: (assetInfo) => {
            let extType = assetInfo.name.split('.').at(1);
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) extType = 'img';
            return `docs_assets/${extType}/[name]-[hash][extname]`;
          },
          chunkFileNames: 'docs_chunks/[name]-[hash].js',
          entryFileNames: 'docs_assets/js/[name]-[hash].js',
        },
      },
    }
  }
});