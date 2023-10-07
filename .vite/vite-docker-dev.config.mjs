'use strict';

/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import viteCommonConfig from './vite-common.config.mjs';

export default viteCommonConfig({
  landingPageBaseUrl: `http://localhost:${process.env.ENV_VSPH_LANDING_PAGE_PORT}`,
  clientBaseUrl: `http://localhost:${process.env.ENV_VSPH_WEB_CLIENT_PORT}`,
  cdnBaseUrl: `http://localhost:${process.env.ENV_VSPH_STATIC_S3_API_PORT}`,
  cdnBaseXHR: `http://vsph-s3-static:9000`,
  isProdMode: true,
});
