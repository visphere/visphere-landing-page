'use strict';

/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import nodejs from '@astrojs/node';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defaultLocaleSitemapFilter, i18n } from 'astro-i18n-aut/integration';
import { defineConfig } from 'astro/config';
import dotenv from 'dotenv';
import fs from 'fs';
import { resolve } from 'path';

const envPath = resolve(process.cwd(), '..', 'moonsphere-base', '.env');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

const defaultLocale = 'pl';
const locales = {
  pl: 'pl',
  en: 'en-US',
};

const availableLocales = [
  { name: 'Polski', id: 'pl', value: 'pl' },
  { name: 'English, US', id: 'en', value: 'en-US' },
];

export default ({
  landingPageBaseUrl,
  clientBaseUrl,
  cdnBaseUrl,
  cdnBaseXHR,
  isProdMode,
}) => {
  process.env.__CDN_BASE_URL__ = cdnBaseUrl;
  return defineConfig({
    output: 'server',
    adapter: nodejs({
      mode: 'standalone',
    }),
    site: clientBaseUrl,
    compressHTML: isProdMode,
    server: {
      host: '0.0.0.0',
      port: isProdMode
        ? 80
        : Number(process.env.ENV_MSPH_LANDING_PAGE_DEV_PORT) || 3001,
    },
    integrations: [
      tailwind(),
      react({
        experimentalReactChildren: true,
      }),
      i18n({
        locales: availableLocales.reduce((acc, locale) => {
          acc[locale.id] = locale.value;
          return acc;
        }, {}),
        defaultLocale,
      }),
      sitemap({
        i18n: {
          locales,
          defaultLocale,
        },
        filter: defaultLocaleSitemapFilter({ defaultLocale }),
      }),
    ],
    vite: {
      define: {
        'process.env.__IS_PRODUCTION_MODE__': isProdMode,
        'process.env.__I18N_DEFAULT_LOCALE__': JSON.stringify(defaultLocale),
        'process.env.__I18N_LOCALES_MAP__': JSON.stringify(availableLocales),
        'process.env.__LANDING_PAGE_BASE_URL__':
          JSON.stringify(landingPageBaseUrl),
        'process.env.__CLIENT_BASE_URL__': JSON.stringify(clientBaseUrl),
        'process.env.__CDN_BASE_URL__': JSON.stringify(cdnBaseUrl),
        'process.env.__CDN_BASE_XHR__': JSON.stringify(cdnBaseXHR),
      },
    },
  });
};
