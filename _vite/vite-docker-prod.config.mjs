'use strict';

/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Milosz Gilga <https://miloszgilga.pl>
 */
import viteCommonConfig from './vite-common.config.mjs';

export default viteCommonConfig({
  landingPageBaseUrl: `https://${process.env.ENV_MSPH_PROD_LANDING_PAGE_DOMAIN}`,
  clientBaseUrl: `https://${process.env.ENV_MSPH_PROD_WEB_CLIENT_DOMAIN}`,
  cdnBaseUrl: `https://${process.env.ENV_MSPH_PROD_CONTENT_DISTRIBUTOR_DOMAIN}`,
  cdnBaseXHR: `https://${process.env.ENV_MSPH_PROD_CONTENT_DISTRIBUTOR_DOMAIN}`,
  isProdMode: true,
});
