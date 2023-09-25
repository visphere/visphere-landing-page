'use strict';

/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import viteCommonConfig from './vite-common.config.mjs';

export default viteCommonConfig({
  landingPageBaseUrl: `http://localhost:${process.env.ENV_MSPH_LANDING_PAGE_PORT}`,
  clientBaseUrl: `http://localhost:${process.env.ENV_MSPH_WEB_CLIENT_PORT}`,
  cdnBaseUrl: `http://localhost:${process.env.ENV_MSPH_STATIC_S3_PORT}`,
  cdnBaseXHR: `http://msph-s3-static:9000`,
  isProdMode: true,
});
