'use strict';

/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import viteCommonConfig from './vite-common.config.mjs';

export default viteCommonConfig({
  landingPageBaseUrl: `https://${process.env.ENV_VSPH_PROD_LANDING_PAGE_DOMAIN}`,
  clientBaseUrl: `https://${process.env.ENV_VSPH_PROD_WEB_CLIENT_DOMAIN}`,
  cdnBaseUrl: `https://${process.env.ENV_VSPH_PROD_STATIC_S3_API_DOMAIN}`,
  cdnBaseXHR: `https://${process.env.ENV_VSPH_PROD_STATIC_S3_API_DOMAIN}`,
  isProdMode: true,
});
