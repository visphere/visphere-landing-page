'use strict';
/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Milosz Gilga <https://miloszgilga.pl>
 */

module.exports = {
  presets: [
    require('../moonsphere-base/tailwind/_tailwind.config.cjs')({
      cdnBaseUrl: process.env.__CDN_BASE_URL__,
      loadableModules: ['common', 'footer', 'landing'],
    }),
  ],
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
};
