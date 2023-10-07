'use strict';
/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */

module.exports = {
  presets: [
    require('../visphere-base/tailwind/_tailwind.config.cjs')({
      cdnBaseUrl: process.env.__CDN_BASE_URL__,
      loadableModules: ['common', 'footer', 'landing'],
    }),
  ],
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
};
