/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: vite-common.config.mjs
 *   Created at: 2023-08-11, 23:19:55
 *   Last updated at: 2023-08-11, 23:19:55
 *
 *   Project name: moonsphere
 *   Module name: moonsphere-landing-page
 *
 * This project is a part of "MoonSphere" instant messenger system. This system is a part of
 * completing an engineers degree in computer science at Silesian University of Technology.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 *
 *   <http://www.apache.org/license/LICENSE-2.0>
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the license.
 */

'use strict';

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
      react(),
      i18n({
        locales,
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
        'process.env.__I18N_LOCALES_MAP__': JSON.stringify(locales),
        'process.env.__LANDING_PAGE_BASE_URL__':
          JSON.stringify(landingPageBaseUrl),
        'process.env.__CLIENT_BASE_URL__': JSON.stringify(clientBaseUrl),
        'process.env.__CDN_BASE_URL__': JSON.stringify(cdnBaseUrl),
        'process.env.__CDN_BASE_XHR__': JSON.stringify(cdnBaseXHR),
      },
    },
  });
};
